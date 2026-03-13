import type { IMonster } from '../../types/monster';
import FighterPanel from './FighterPanel';
import { useBattleController } from '../../hooks/battle';

interface BattleArenaProps {
  attacker: IMonster;
  defender: IMonster;
  onBattleComplete?: () => void;
}

export default function BattleArena({ attacker, defender, onBattleComplete }: BattleArenaProps) {
  const {
    hpLeft,
    hpRight,
    round,
    phase,
    attackingSide,
    damageDealt,
    defenderHit,
    winner,
    isAnimating,
    maxHpLeft,
    maxHpRight,
    startBattle,
    resetBattle,
  } = useBattleController(attacker, defender, onBattleComplete);

  const btnClass =
    'inline-flex items-center justify-center py-2.5 px-5 text-sm font-semibold text-slate-800 bg-gradient-to-b from-amber-500 to-amber-600 rounded-lg border-0 shadow-[0_4px_14px_rgba(245,158,11,0.35)] cursor-pointer transition-[transform,box-shadow] duration-200 hover:from-amber-400 hover:to-amber-500 hover:shadow-[0_6px_18px_rgba(245,158,11,0.45)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed';

  return (
    <div>
      <div className="flex items-center justify-center gap-4 min-h-[160px] relative">
        <FighterPanel
          side="left"
          monster={attacker}
          isAttacking={attackingSide === 'left'}
          isHit={defenderHit === 'left'}
          damageDealt={damageDealt}
          currentHp={phase === 'idle' ? maxHpLeft : hpLeft}
          maxHp={maxHpLeft}
        />

        <div className="shrink-0 w-12 flex flex-col items-center justify-center gap-1">
          <span className="text-2xl font-extrabold text-amber-500 tracking-[0.2em] transition-opacity duration-200">
            VS
          </span>
          {phase !== 'idle' && round > 0 && (
            <span className="text-[0.7rem] text-slate-500 font-semibold">Round {round}</span>
          )}
        </div>

        <FighterPanel
          side="right"
          monster={defender}
          isAttacking={attackingSide === 'right'}
          isHit={defenderHit === 'right'}
          damageDealt={damageDealt}
          currentHp={phase === 'idle' ? maxHpRight : hpRight}
          maxHp={maxHpRight}
        />
      </div>

      <div className="flex justify-center items-center gap-3 mt-4 min-h-[2.75rem]">
        {phase === 'idle' && (
          <button type="button" onClick={startBattle} className={btnClass}>
            Iniciar batalha
          </button>
        )}
        {phase === 'done' && winner && (
          <>
            <span className="text-base font-bold text-green-500">
              {winner === 'left' ? attacker.name : defender.name} venceu!
            </span>
            <button type="button" onClick={resetBattle} className={btnClass}>
              Batalhar de novo
            </button>
          </>
        )}
        {isAnimating && (
          <span className="text-sm text-slate-400 italic" aria-live="polite">
            {attackingSide === 'left' ? 'Atacando (esquerda)...' : 'Atacando (direita)...'}
          </span>
        )}
      </div>
    </div>
  );
}
