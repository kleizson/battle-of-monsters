import type { IMonster } from '../../types/monster';
import { useMonsterSelection } from '../useMonsterSelection';

export interface UseBattleSelectionResult {
  selectedIndexes: number[];
  toggleSelection: (index: number) => void;
  attacker: IMonster | null;
  defender: IMonster | null;
}

export function useBattleSelection(
  monsters: IMonster[],
  maxSelected: number = 2,
): UseBattleSelectionResult {
  const { selected, toggle } = useMonsterSelection(maxSelected);

  const hasTwoSelected = selected.length === 2;

  const attacker =
    hasTwoSelected && monsters[selected[0]] ? monsters[selected[0]] : null;
  const defender =
    hasTwoSelected && monsters[selected[1]] ? monsters[selected[1]] : null;

  return {
    selectedIndexes: selected,
    toggleSelection: toggle,
    attacker,
    defender,
  };
}

