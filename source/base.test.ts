import _ from 'lodash';
import { fight } from './index';
import {createChineseArmy } from './models';

describe('Game test', () => {
  it(`Basic train test`, () => {
    const army1 = createChineseArmy();
    const army2 = createChineseArmy();
    const soldierID = Object.keys(army1.soldiers)[0];
    army1.trainSoldier(soldierID);
    const winner = fight(army1, army2);
    expect(winner).toEqual(army1.id)
    expect(army1.goldenCoins).toBeGreaterThan(army2.goldenCoins)
    expect(army1.goldenTransactions).toHaveLength(2)
    expect(army2.goldenTransactions).toHaveLength(0)
    expect(army1.battlesHistory).toHaveLength(1)
    expect(army2.battlesHistory).toHaveLength(1)
  });
});
