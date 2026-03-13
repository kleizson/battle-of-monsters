import { useState } from 'react';

export function useMonsterSelection(maxSelected: number = 2) {
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (index: number) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      }

      if (prevSelected.length >= maxSelected) {
        return prevSelected;
      }

      return [...prevSelected, index];
    });
  };

  return {
    selected,
    toggle,
  };
}

