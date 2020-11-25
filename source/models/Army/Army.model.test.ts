import config from 'config';
import { ARCHER_SOLDIER_NAME, KNIGHT_SOLDIER_NAME, PIKEMAN_SOLDIER_NAME } from '../../constants';
import { Army, IArmyParams } from './Army.model';
import { createArraySoldierType } from '../Civilization';
import { Battle } from '../Battle';
import { add } from 'lodash';
import { initialGoldenPoints } from '../../config/default';

describe('Army model test', () => {
  const soldiers = createArraySoldierType(ARCHER_SOLDIER_NAME, 10);
  it(`Basic test`, () => {
    const params: IArmyParams = { civilizationName: 'chinese', initialGoldenCoins: 1001, id: 'id', soldiers };
    const army = new Army(params);
    expect(army.battlesHistory).toHaveLength(0);
    expect(army.goldenTransactions).toHaveLength(0);
    expect(army.civilizationName).toEqual(params.civilizationName);
    expect(army.civilizationName).toEqual(params.civilizationName);
    expect(army.goldenCoins).toEqual(params.initialGoldenCoins);
    expect(army.id).toEqual(params.id);
    expect(Object.values(army.soldiers)).toHaveLength(soldiers.length);
  });

  it(`Soldier Training`, () => {
    const soldier = soldiers[0];
    const initialPoints = soldier.points;
    const params: IArmyParams = { civilizationName: 'chinese', initialGoldenCoins: 1000, id: 'id', soldiers };
    const army = new Army(params);
    army.trainSoldier(soldier.id);
    expect(army.goldenTransactions).toHaveLength(1);
    expect(soldier.points).toBeGreaterThan(initialPoints);
  });

  it(`Soldier Training: not enough gold for training`, () => {
    let error;
    let index = 0;
    const soldier = soldiers[0];
    const initialPoints = soldier.points;
    const params: IArmyParams = { civilizationName: 'chinese', initialGoldenCoins: 1000, id: 'id', soldiers };
    const army = new Army(params);
    try {
      for (let i = 0; i < 1000; index++) army.trainSoldier(soldier.id);
    } catch (err) {
      error = err;
    }
    expect(army.goldenTransactions).toHaveLength(index);
    expect(soldier.points).toBeGreaterThan(initialPoints);
    expect(error).toBeDefined();
  });

  it(`Soldier Transform`, () => {
    const soldier = soldiers[0];
    const initialPoints = soldier.points;
    const params: IArmyParams = { civilizationName: 'chinese', initialGoldenCoins: 1000, id: 'id', soldiers };
    const army = new Army(params);
    army.transformSoldier(soldier.id);
    expect(army.goldenTransactions).toHaveLength(1);
    expect(soldier.points).toBeGreaterThan(initialPoints);
  });

  it(`Adding lost battle`, () => {
    const soldier1 = soldiers[0];
    const soldier2 = soldiers[1];
    const params: IArmyParams = { civilizationName: 'chinese', initialGoldenCoins: 1000, id: 'id', soldiers };
    const army = new Army(params);
    army.trainSoldier(soldier1.id);
    army.trainSoldier(soldier2.id);
    army.addLostBattle(new Battle({ winnerId: '1', armyBId: '1', armyAId: '2' }));
    expect(army.soldiers[soldier1.id]).toBeUndefined();
    expect(army.soldiers[soldier2.id]).toBeUndefined();
    expect(army.battlesHistory).toHaveLength(1);
  });

  it(`Adding lost battle with all soldiers with same points`, () => {
    const soldier1 = soldiers[0];
    const soldier2 = soldiers[1];
    const params: IArmyParams = { civilizationName: 'chinese', initialGoldenCoins: 1000, id: 'id', soldiers };
    const army = new Army(params);
    army.addLostBattle(new Battle({ winnerId: '1', armyBId: '1', armyAId: '2' }));
    expect(army.soldiers[soldier1.id]).toBeUndefined();
    expect(army.soldiers[soldier2.id]).toBeUndefined();
    expect(army.battlesHistory).toHaveLength(1);
  });

  it(`Adding draw battle`, () => {
    const initialAmountSoldiers = soldiers.length;
    const params: IArmyParams = { civilizationName: 'chinese', initialGoldenCoins: 1000, id: 'id', soldiers };
    const army = new Army(params);
    army.addDrawBattle(new Battle({ armyBId: '1', armyAId: '2' }));
    expect(Object.values(army.soldiers).length).toBeLessThan(initialAmountSoldiers);
  });

  it(`Adding won battle`, () => {
    const initialAmountSoldiers = soldiers.length;
    const params: IArmyParams = { civilizationName: 'chinese', initialGoldenCoins: 1000, id: 'id', soldiers };
    const army = new Army(params);
    army.addWonBattle(new Battle({ armyBId: '1', armyAId: '2' }));
    expect(army.goldenCoins).toEqual(initialGoldenPoints + (config.get('wonBattlePrize') as number));
    expect(army.goldenTransactions).toHaveLength(1);
  });

  it(`Testing points`, () => {
    const params: IArmyParams = { civilizationName: 'chinese', initialGoldenCoins: 1000, id: 'id', soldiers };
    const army = new Army(params);
    army.addWonBattle(new Battle({ armyBId: '1', armyAId: '2' }));
    expect(army.amountPounts()).toEqual(soldiers.map((x) => x.points).reduce((t, c) => t + c, 0));
  });
});
