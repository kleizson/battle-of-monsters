import type { IMonster } from '../../types/monster';
import { MONSTER_STAT_DISPLAY, getStatValue } from '../../constants/monsterStats';

interface MonsterStatsProps {
  monster: IMonster;
}

export function MonsterStatsGrid({ monster }: MonsterStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[11px] text-slate-200">
      {MONSTER_STAT_DISPLAY.map(({ key, emoji }) => (
        <span key={key} className="flex flex-col items-center gap-1">
          <span className="text-[14px] leading-none">{emoji}</span>
          <span className="font-semibold text-emerald-400">{getStatValue(monster, key)}</span>
        </span>
      ))}
    </div>
  );
}

export function MonsterStatsPreview({ monster }: MonsterStatsProps) {
  const statDisplayClass =
    'flex items-end justify-between p-2 bg-slate-700/80 rounded-lg border border-slate-600';

  return (
    <div className="grid gap-5 text-sm font-medium text-slate-300">
      {MONSTER_STAT_DISPLAY.map(({ key, emoji, label }) => (
        <div key={key} className={statDisplayClass}>
          <span>{emoji} {label}:</span>
          <span className="font-bold text-emerald-400">{getStatValue(monster, key)}</span>
        </div>
      ))}
    </div>
  );
}
