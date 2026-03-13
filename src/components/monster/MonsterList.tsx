import type { IMonster } from '../../types/monster';
import { MonsterCard } from './MonsterCard';

interface MonsterListProps {
  monsters: IMonster[];
  selectedIndexes: number[];
  onToggleSelect: (index: number) => void;
}

export function MonsterList({ monsters, selectedIndexes, onToggleSelect }: MonsterListProps) {
  if (!monsters.length) {
    return (
      <p className="text-sm text-slate-400">
        Nenhum monstro criado ainda. Crie um novo para aparecer aqui.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 max-h-56 overflow-y-auto pt-2 pb-2 px-2">
      {monsters.map((monster, index) => (
        <MonsterCard
          key={monster.id}
          monster={monster}
          isSelected={selectedIndexes.includes(index)}
          onSelect={() => onToggleSelect(index)}
        />
      ))}
    </div>
  );
}
