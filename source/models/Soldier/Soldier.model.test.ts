import { ARCHER_SOLDIER_NAME, PIKEMAN_SOLDIER_NAME } from '../../constants';
import { Soldier, ISoldierParams, SoldierPointMatrix } from './Soldier.model';

describe('GoldenTransaction model test', () => {
  it('Basic testing', () => {
    const params: ISoldierParams = { id: '1', soldierType: PIKEMAN_SOLDIER_NAME };
    const soldier = new Soldier(params);
    expect(soldier.id).toEqual(params.id);
    expect(soldier.type).toEqual(params.soldierType);
    expect(soldier.points).toEqual(SoldierPointMatrix[PIKEMAN_SOLDIER_NAME]);
  });

  it('Basic testin with unknown type', () => {
    const params: ISoldierParams = { id: '1', soldierType: 'any' };
    const soldier = new Soldier(params);
    expect(soldier.id).toEqual(params.id);
    expect(soldier.type).toEqual(params.soldierType);
    expect(soldier.points).toEqual(0);
  });

  it('Basic train testing', () => {
    const params: ISoldierParams = { id: '1', soldierType: PIKEMAN_SOLDIER_NAME };
    const newPoints = 10;
    const soldier = new Soldier(params);
    expect(soldier.id).toEqual(params.id);
    expect(soldier.type).toEqual(params.soldierType);
    expect(soldier.points).toEqual(SoldierPointMatrix[PIKEMAN_SOLDIER_NAME]);
    soldier.train(newPoints);
    expect(soldier.points).toEqual(SoldierPointMatrix[PIKEMAN_SOLDIER_NAME] + newPoints);
  });

  it('Basic transform testing', () => {
    const params: ISoldierParams = { id: '1', soldierType: PIKEMAN_SOLDIER_NAME };
    const newPoints = 10;
    const soldier = new Soldier(params);
    expect(soldier.id).toEqual(params.id);
    expect(soldier.type).toEqual(params.soldierType);
    expect(soldier.points).toEqual(SoldierPointMatrix[PIKEMAN_SOLDIER_NAME]);
    soldier.train(newPoints);
    soldier.transform(ARCHER_SOLDIER_NAME);
    expect(soldier.points).toEqual(SoldierPointMatrix[ARCHER_SOLDIER_NAME] + newPoints);
    expect(soldier.type).toEqual(ARCHER_SOLDIER_NAME);
  });
});
