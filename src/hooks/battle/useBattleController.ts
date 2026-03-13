import { useCallback, useEffect, useRef, useState } from 'react';
import type { IMonster } from '../../types/monster';
import { BattleSimulator } from '../../domain/battle/BattleSimulator';
import { mapToBattleMonster } from '../../domain/monster/Monster';
import type { BattleLogEntry, BattlePhase, BattleState, Side } from '../../types/battle';
import {
  BATTLE_DAMAGE_FLASH_MS,
  BATTLE_NEXT_STEP_DELAY_MS,
  BATTLE_STEP_DURATION_MS,
  DEFAULT_HP_FALLBACK,
} from '../../constants/battle';

const initialBattleState: BattleState = {
  hpLeft: 0,
  hpRight: 0,
  maxHpLeft: 0,
  maxHpRight: 0,
  round: 0,
  phase: 'idle',
  attackingSide: null,
  damageDealt: null,
  defenderHit: null,
  winner: null,
};

export interface UseBattleControllerResult {
  hpLeft: number;
  hpRight: number;
  round: number;
  phase: BattlePhase;
  attackingSide: Side | null;
  damageDealt: number | null;
  defenderHit: Side | null;
  winner: Side | null;
  isAnimating: boolean;
  maxHpLeft: number;
  maxHpRight: number;
  startBattle: () => void;
  resetBattle: () => void;
}

export function useBattleController(
  attacker: IMonster,
  defender: IMonster,
  onBattleComplete?: () => void
): UseBattleControllerResult {
  const [state, setState] = useState<BattleState>(initialBattleState);

  const onBattleCompleteRef = useRef(onBattleComplete);
  useEffect(() => {
    onBattleCompleteRef.current = onBattleComplete;
  }, [onBattleComplete]);

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const battleLogRef = useRef<BattleLogEntry[]>([]);
  const battleSimulatorRef = useRef<BattleSimulator>(new BattleSimulator());

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearTimeouts();
  }, [clearTimeouts]);

  const runStepRef = useRef<(stepIndex: number) => void>(() => { });
  const runStep = useCallback(
    (stepIndex: number) => {
      const log = battleLogRef.current;
      if (stepIndex >= log.length) return;

      const step = log[stepIndex];
      const isLeftAttacking = step.side === 'left';

      setState((prev) => ({
        ...prev,
        round: step.round,
        phase: 'attacking',
        attackingSide: step.side,
        damageDealt: step.damage,
        defenderHit: null,
      }));

      const t1 = setTimeout(
        () =>
          setState((prev) => ({
            ...prev,
            defenderHit: isLeftAttacking ? 'right' : 'left',
          })),
        BATTLE_DAMAGE_FLASH_MS
      );

      const t2 = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          defenderHit: null,
          damageDealt: null,
          attackingSide: null,
          hpLeft: step.leftHp,
          hpRight: step.rightHp,
          ...(step.winner !== null ? { winner: step.winner, phase: 'done' as BattlePhase } : {}),
        }));

        if (step.winner !== null) {
          onBattleCompleteRef.current?.();
          return;
        }

        const t3 = setTimeout(() => {
          runStepRef.current(stepIndex + 1);
        }, BATTLE_NEXT_STEP_DELAY_MS);
        timeoutsRef.current.push(t3);
      }, BATTLE_STEP_DURATION_MS);

      timeoutsRef.current.push(t1, t2);
    },
    []
  );
  useEffect(() => {
    runStepRef.current = runStep;
  }, [runStep]);

  const startBattle = useCallback(() => {
    clearTimeouts();

    const leftMonster = mapToBattleMonster(attacker);
    const rightMonster = mapToBattleMonster(defender);

    const battleSimulator = battleSimulatorRef.current;
    const { log } = battleSimulator.simulate(leftMonster, rightMonster);
    battleLogRef.current = log;

    if (log.length === 0) {
      const winnerSide: Side = leftMonster.isDead() ? 'right' : 'left';
      setState({
        ...initialBattleState,
        hpLeft: leftMonster.hp,
        hpRight: rightMonster.hp,
        maxHpLeft: leftMonster.hp,
        maxHpRight: rightMonster.hp,
        round: 1,
        winner: winnerSide,
        phase: 'done',
      });
      onBattleCompleteRef.current?.();
      return;
    }

    setState({
      ...initialBattleState,
      hpLeft: leftMonster.hp,
      hpRight: rightMonster.hp,
      maxHpLeft: leftMonster.hp,
      maxHpRight: rightMonster.hp,
      round: 1,
      phase: 'attacking',
      attackingSide: log[0].side,
    });
    runStep(0);
  }, [attacker, defender, clearTimeouts, runStep]);

  const resetBattle = useCallback(() => {
    clearTimeouts();
    setState(initialBattleState);
    battleLogRef.current = [];
  }, [clearTimeouts]);

  const maxHpLeft = state.maxHpLeft || Number(attacker.hp) || DEFAULT_HP_FALLBACK;
  const maxHpRight = state.maxHpRight || Number(defender.hp) || DEFAULT_HP_FALLBACK;
  const isAnimating = state.phase === 'attacking';

  return {
    hpLeft: state.hpLeft,
    hpRight: state.hpRight,
    round: state.round,
    phase: state.phase,
    attackingSide: state.attackingSide,
    damageDealt: state.damageDealt,
    defenderHit: state.defenderHit,
    winner: state.winner,
    isAnimating,
    maxHpLeft,
    maxHpRight,
    startBattle,
    resetBattle,
  };
}

