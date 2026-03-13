import type { IMonster } from '../../types/monster';
import { Button } from '@headlessui/react';
import { MonsterList } from './MonsterList';

interface MonsterSelectionPanelProps {
  monsters: IMonster[];
  selectedIndexes: number[];
  onToggleSelect: (index: number) => void;
  onClickCreateMonster: () => void;
}

export function MonsterSelectionPanel({
  monsters,
  selectedIndexes,
  onToggleSelect,
  onClickCreateMonster,
}: MonsterSelectionPanelProps) {
  return (
    <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between gap-3 px-2">
        <h1 className="text-sm font-semibold text-slate-100 tracking-wide uppercase">
          Escolha seu monstro
        </h1>

        <Button
          onClick={onClickCreateMonster}
          className="inline-flex items-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-md shadow-emerald-500/30 transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        >
          Criar novo monstro
        </Button>
      </div>

      <MonsterList
        monsters={monsters}
        selectedIndexes={selectedIndexes}
        onToggleSelect={onToggleSelect}
      />
    </div>
  );
}
