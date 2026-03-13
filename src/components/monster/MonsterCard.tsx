import type { IMonster } from '../../types/monster';
import { MonsterStatsGrid } from './MonsterStats';

interface MonsterCardProps {
  monster: IMonster;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function MonsterCard({ monster, isSelected = false, onSelect }: MonsterCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative flex flex-col items-center flex-shrink-0 w-24 rounded-xl border bg-slate-700/60 transition-colors duration-150 focus:outline-none ${isSelected
        ? 'border-emerald-400 ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-800'
        : 'border-slate-600 hover:border-emerald-400 hover:bg-slate-700'
        }`}
    >
      <div className="w-full h-20 flex justify-center overflow-hidden">
        {monster.image_url ? (
          <img
            src={monster.image_url}
            alt={monster.name ? `Monstro ${monster.name}` : 'Monstro'}
            className="h-full object-cover"
          />
        ) : (
          <span className="text-slate-500 text-3xl">?</span>
        )}
      </div>
      <span className="w-full px-1 py-1 text-[11px] font-medium text-slate-100 text-center truncate bg-slate-800/80">
        {monster.name}
      </span>

      {/* Tooltip de status */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-20">
        <div className="rounded-xl bg-slate-900/95 border border-slate-600 px-3 py-2 shadow-md shadow-black/30 max-w-full">
          <p className="text-[11px] font-semibold text-slate-100 mb-1 text-center">
            Status
          </p>
          <MonsterStatsGrid monster={monster} />
        </div>
      </div>
    </button>
  );
}
