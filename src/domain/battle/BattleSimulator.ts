import { BattleMonster } from '../monster/Monster';
import type { BattleLogEntry, Side } from '../../types/battle';
import { MIN_DAMAGE } from '../../constants/battle';

export class BattleSimulator {
  /**
   * Roda a batalha inteira (em cópias) e retorna os passos para animar na UI.
   * leftMonster = lado esquerdo, rightMonster = lado direito.
   */
  public simulate(leftMonster: BattleMonster, rightMonster: BattleMonster): { log: BattleLogEntry[] } {
    let leftHp = leftMonster.hp;
    let rightHp = rightMonster.hp;

    const firstSide = this.firstSide(leftMonster, rightMonster);
    let atkSide: Side = firstSide;
    let defSide: Side = firstSide === 'left' ? 'right' : 'left';

    const log: BattleLogEntry[] = [];

    while (leftHp > 0 && rightHp > 0) {
      const { atk, def } = this.sidesToMonsters(atkSide, leftMonster, rightMonster);

      const dmg = calculateDamage(atk, def);

      const hp = this.applyDamage(defSide, leftHp, rightHp, dmg);

      leftHp = hp.left;
      rightHp = hp.right;

      const round = Math.floor(log.length / 2) + 1;
      const winner = this.winner(leftHp, rightHp, defSide);

      log.push({
        round,
        side: atkSide,
        damage: dmg,
        leftHp,
        rightHp,
        winner,
      });

      if (winner) {
        break;
      }

      const next = this.nextSides(atkSide);
      atkSide = next.atk;
      defSide = next.def;
    }

    return { log };
  }

  /**
   * Decide qual lado ataca primeiro.
   * - Usa velocidade como critério principal.
   * - Em caso de empate na velocidade, usa ataque como critério de desempate.
   * - Em último caso, o lado esquerdo começa.
   */
  private firstSide(left: BattleMonster, right: BattleMonster): Side {
    if (left.speed > right.speed) return 'left';
    if (right.speed > left.speed) return 'right';

    if (left.attack > right.attack) return 'left';
    if (right.attack > left.attack) return 'right';

    return 'left';
  }

  private sidesToMonsters(
    atkSide: Side,
    left: BattleMonster,
    right: BattleMonster
  ): { atk: BattleMonster; def: BattleMonster } {
    const [atk, def] = atkSide === 'left' ? [left, right] : [right, left];
    return { atk, def };
  }

  private applyDamage(
    defSide: Side,
    leftHp: number,
    rightHp: number,
    dmg: number
  ): { left: number; right: number } {
    if (defSide === 'left') {
      return {
        left: Math.max(0, leftHp - dmg),
        right: rightHp,
      };
    }

    return {
      left: leftHp,
      right: Math.max(0, rightHp - dmg),
    };
  }

  private winner(leftHp: number, rightHp: number, defSide: Side): Side | null {
    const dead = leftHp <= 0 || rightHp <= 0;
    if (!dead) return null;

    return defSide === 'left' ? 'right' : 'left';
  }

  private nextSides(atkSide: Side): { atk: Side; def: Side } {
    const atk = atkSide === 'left' ? 'right' : 'left';
    const def = atk === 'left' ? 'right' : 'left';

    return { atk, def };
  }
}

function calculateDamage(attacker: BattleMonster, defender: BattleMonster): number {
  const raw = attacker.attack - defender.defense;

  if (raw <= 0) {
    return MIN_DAMAGE;
  }

  return raw;
}

