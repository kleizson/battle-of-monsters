export type BattlePhase = 'idle' | 'attacking' | 'done';

export type Side = 'left' | 'right';

/** Um passo da batalha para exibir na UI (left = primeiro monstro, right = segundo). */
export interface BattleLogEntry {
    round: number;
    side: Side;
    damage: number;
    leftHp: number;
    rightHp: number;
    winner: Side | null;
}

export interface BattleState {
    hpLeft: number;
    hpRight: number;
    maxHpLeft: number;
    maxHpRight: number;
    round: number;
    phase: BattlePhase;
    attackingSide: Side | null;
    damageDealt: number | null;
    defenderHit: Side | null;
    winner: Side | null;
}
