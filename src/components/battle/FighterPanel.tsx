import type { IMonster } from '../../types/monster';
import type { Side } from '../../types/battle';
import { MONSTER_STAT_DISPLAY, getStatValue } from '../../constants/monsterStats';
import { HP_BAR_LOW_PERCENT, HP_BAR_MEDIUM_PERCENT } from '../../constants/battle';

// --- Types ---

interface FighterPanelProps {
  monster: IMonster;
  side: Side;
  isAttacking: boolean;
  isHit: boolean;
  damageDealt: number | null;
  currentHp: number;
  maxHp: number;
}

// --- Helpers ---

function getHpBarFillClass(percent: number): string {
  if (percent <= HP_BAR_LOW_PERCENT) {
    return 'bg-gradient-to-r from-red-500 to-red-700';
  }
  if (percent <= HP_BAR_MEDIUM_PERCENT) {
    return 'bg-gradient-to-r from-amber-500 to-amber-600';
  }
  return 'bg-gradient-to-r from-green-500 to-green-600';
}

function getLungeAnimationClass(side: Side): string {
  return side === 'left'
    ? 'animate-[lunge-and-return-right_0.9s_ease-in-out_forwards]'
    : 'animate-[lunge-and-return-left_0.9s_ease-in-out_forwards]';
}

// --- Subcomponents ---

interface HpBarProps {
  current: number;
  max: number;
  name: string;
}

function HpBar({ current, max, name }: HpBarProps) {
  const percent = max > 0 ? Math.max(0, (current / max) * 100) : 0;
  const fillClass = getHpBarFillClass(percent);

  return (
    <div className="w-full max-w-[100px]">
      <div className="flex justify-between text-[0.65rem] text-slate-400 mb-0.5">
        <span>HP</span>
        <span>{Math.max(0, current)} / {max}</span>
      </div>
      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-[width] duration-300 ease-out ${fillClass}`}
          style={{ width: `${percent}%` }}
          title={`${name}: ${current}/${max}`}
        />
      </div>
    </div>
  );
}

interface DamageOverlayProps {
  damage: number;
}

function DamageOverlay({ damage }: DamageOverlayProps) {
  const damageStyle = {
    textShadow: '0 0 4px #7f1d1d, 0 0 8px #991b1b, 0 2px 4px rgba(0,0,0,0.8)',
  };

  return (
    <span
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-extrabold text-red-50 pointer-events-none z-[5] animate-[damage-pop_0.9s_ease-out_forwards]"
      style={damageStyle}
    >
      {damage}
    </span>
  );
}

// --- Main component ---

const CONTAINER_CLASS = 'flex flex-col items-center gap-1.5 w-[120px] shrink-0';
const AVATAR_FRAME_CLASS = 'w-full h-full rounded-2xl overflow-hidden border-[3px] border-slate-600 bg-slate-700/70 flex items-center justify-center';
const HIT_ANIMATION_CLASS = 'animate-[hit-reaction_0.35s_ease-out]';
const NAME_CLASS = 'text-xs font-semibold text-slate-200 text-center max-w-full overflow-hidden text-ellipsis whitespace-nowrap';
const STATS_ROW_CLASS = 'flex gap-2 text-[0.7rem] text-slate-400';

export default function FighterPanel({
  monster,
  side,
  isAttacking,
  isHit,
  damageDealt,
  currentHp,
  maxHp,
}: FighterPanelProps) {
  const displayName = monster.name;
  const containerClass = [
    CONTAINER_CLASS,
    isAttacking && getLungeAnimationClass(side),
  ].filter(Boolean).join(' ');
  const avatarClass = [AVATAR_FRAME_CLASS, isHit && HIT_ANIMATION_CLASS].filter(Boolean).join(' ');
  const showDamage = damageDealt !== null && isHit;

  return (
    <div className={containerClass}>
      <div className="relative w-[100px] h-[100px]">
        <div className={avatarClass}>
          {monster.image_url ? (
            <img
              src={monster.image_url}
              alt={monster.name}
              className="h-full object-cover block"
            />
          ) : (
            <span className="text-[2.5rem] text-slate-400">?</span>
          )}
        </div>
        {showDamage && <DamageOverlay damage={damageDealt!} />}
      </div>

      <span className={NAME_CLASS}>{displayName}</span>

      <HpBar
        current={currentHp}
        max={maxHp}
        name={monster.name}
      />

      <div className={STATS_ROW_CLASS}>
        {MONSTER_STAT_DISPLAY.slice(0, 2).map(({ key, emoji, label }) => (
          <span key={key} title={label}>
            {emoji} {getStatValue(monster, key)}
          </span>
        ))}
      </div>
    </div>
  );
}
