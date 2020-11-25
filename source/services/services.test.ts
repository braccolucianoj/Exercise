import _ from 'lodash';

import train, { TRAINING_COSTS } from './training.service';
import transform, { ADJACENCY_MATRIX, nextSoldierLevel } from './transformation.service';
import { ARCHER_SOLDIER_NAME, KNIGHT_SOLDIER_NAME, PIKEMAN_SOLDIER_NAME } from '../constants';

describe('Train Service tests', () => {
  it(`Basic train test`, () => {
    const result = train(PIKEMAN_SOLDIER_NAME);
    const expected = TRAINING_COSTS[PIKEMAN_SOLDIER_NAME];
    expect(result.cost).toEqual(expected.cost);
    expect(result.pointsGained).toEqual(expected.pointsGained);
  });

  it(`Basic test train with unknown type`, () => {
    const result = train('PIKEMAN_SOLDIER_NAME');
    expect(result.cost).toBeUndefined();
    expect(result.pointsGained).toBeUndefined();
  });
});

describe('Transform Service tests', () => {
  [PIKEMAN_SOLDIER_NAME, ARCHER_SOLDIER_NAME, KNIGHT_SOLDIER_NAME].forEach((soldierType: string) => {
    it(`Basic transform test for ${soldierType}`, () => {
      const result = transform(soldierType);
      const nextType = nextSoldierLevel(soldierType);
      const expectedCost = _.get(ADJACENCY_MATRIX, `${soldierType}.${nextType}`);
      expect(result.cost).toEqual(expectedCost);
      expect(result.newSoldierType).toEqual(nextType);
    });
  });

  it(`Basic test train with unknown type`, () => {
    const result = transform('ANY');
    expect(result.cost).toBeUndefined();
    expect(result.newSoldierType).toBeUndefined();
  });
});
