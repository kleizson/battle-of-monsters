import { type ChangeEvent, useRef, useState } from 'react';
import type { IMonster } from '../types/monster';
import { INITIAL_MONSTER_STATE } from '../constants/monster';
import { STAT_KEYS } from '../constants/monsterStats';

export interface UseMonstersResult {
  monster: IMonster;
  monsterList: IMonster[];
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  createMonster: () => void;
}

export function useMonsters(): UseMonstersResult {
  const [monster, setMonster] = useState<IMonster>(INITIAL_MONSTER_STATE);
  const [monsterList, setMonsterList] = useState<IMonster[]>([]);
  const nextIdRef = useRef(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setMonster((prev) => ({
      ...prev,
      [name]: (STAT_KEYS as readonly string[]).includes(name)
        ? Number(value)
        : value,
    }));
  };

  const createMonster = () => {
    setMonsterList((prevList) => [
      ...prevList,
      { ...monster, id: String(++nextIdRef.current) },
    ]);
    setMonster(INITIAL_MONSTER_STATE);
  };

  return {
    monster,
    monsterList: monsterList as IMonster[],
    handleChange,
    createMonster,
  };
}

