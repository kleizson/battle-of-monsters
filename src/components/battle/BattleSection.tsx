import type { IMonster } from '../../types/monster';
import BattleArena from './BattleArena';

interface BattleSectionProps {
  attacker: IMonster | null;
  defender: IMonster | null;
}

export function BattleSection({ attacker, defender }: BattleSectionProps) {
  const hasBothMonsters = !!attacker && !!defender;

  if (!hasBothMonsters) {
    return null;
  }

  return (
    <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 space-y-4">
      <h2 className="text-sm font-semibold text-slate-100 tracking-wide uppercase text-center">
        Batalha
      </h2>
      <BattleArena attacker={attacker} defender={defender} />
    </div>
  );
}
