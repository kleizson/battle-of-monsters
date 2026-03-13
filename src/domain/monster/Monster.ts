import type { IMonster } from '../../types/monster';

export class BattleMonster {
  constructor(
    public name: string,
    public hp: number,
    public attack: number,
    public defense: number,
    public speed: number
  ) { }

  isDead(): boolean {
    return this.hp <= 0;
  }
}

export function mapToBattleMonster(source: IMonster): BattleMonster {
  return new BattleMonster(
    source.name,
    Number(source.hp) || 0,
    Number(source.attack) || 0,
    Number(source.defense) || 0,
    Number(source.speed) || 0
  );
}

