import type { IMonster } from '../types/monster';

export const MONSTER_STAT_DISPLAY = [
  { key: 'attack' as const, emoji: '⚔️', label: 'Ataque' },
  { key: 'defense' as const, emoji: '🛡️', label: 'Defesa' },
  { key: 'speed' as const, emoji: '⚡', label: 'Velocidade' },
  { key: 'hp' as const, emoji: '❤️', label: 'HP' },
] as const;

/** Keys numéricos do monstro (uma única fonte para formulário e handleChange). */
export const STAT_KEYS = MONSTER_STAT_DISPLAY.map((s) => s.key);

export function getStatValue(monster: IMonster, key: (typeof MONSTER_STAT_DISPLAY)[number]['key']): number {
  return monster[key];
}
