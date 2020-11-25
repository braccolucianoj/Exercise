import { Army } from './models/Army/Army.model';
import { Battle } from './models/Battle/Battle.model';

export const fight = (Army1: Army, Army2: Army) => {
  const points1 = Army1.amountPounts();
  const points2 = Army2.amountPounts();
  let winner;
  const createBattle = (winnerId?: string) =>
    new Battle({
      armyAId: Army1.id,
      armyBId: Army2.id,
      winnerId,
    });
  if (points1 > points2) {
    const battle = createBattle(Army1.id);
    winner = Army1.id;
    Army1.addWonBattle(battle);
    Army2.addLostBattle(battle);
  } else if (points1 < points2) {
    winner = Army2.id;
    const battle = createBattle(Army2.id);
    Army2.addWonBattle(battle);
    Army1.addLostBattle(battle);
  } else {
    const battle = createBattle();
    Army2.addWonBattle(battle);
    Army1.addLostBattle(battle);
  }
  return winner;
};
