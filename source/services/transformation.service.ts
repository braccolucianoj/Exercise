// The transformation can be modelled as a function
// which uses a di-graph. The graph would need the initial node
// and the destination node and return whether it's possible
// to do that transformation or not.
// The function will only need the soldier type as each node will have
// zero (knight) or one (pikeman & archer) outbound edge

import _ from 'lodash';
import { PIKEMAN_SOLDIER_NAME, ARCHER_SOLDIER_NAME, KNIGHT_SOLDIER_NAME } from '../constants';

interface TransformResult {
  newSoldierType?: string;
  cost: number;
}

export const ADJACENCY_MATRIX = {
  [PIKEMAN_SOLDIER_NAME]: {
    [ARCHER_SOLDIER_NAME]: 30,
  },
  [PIKEMAN_SOLDIER_NAME]: {
    [ARCHER_SOLDIER_NAME]: 30,
  },
  [ARCHER_SOLDIER_NAME]: {
    [KNIGHT_SOLDIER_NAME]: 40,
  },
  [KNIGHT_SOLDIER_NAME]: {},
};

const transformSoldier = (inputType: string, outputType?: string): number =>
  _.get(ADJACENCY_MATRIX, `${inputType}.${outputType}`);

export const nextSoldierLevel = (soldierType: string) => {
  switch (soldierType) {
    case KNIGHT_SOLDIER_NAME:
      return undefined;
    case PIKEMAN_SOLDIER_NAME:
      return ARCHER_SOLDIER_NAME;
    case ARCHER_SOLDIER_NAME:
      return KNIGHT_SOLDIER_NAME;
    default:
      return undefined;
  }
};

export default (soldierType: string): TransformResult => {
  const newSoldierType = nextSoldierLevel(soldierType);
  const cost = transformSoldier(soldierType, newSoldierType);
  return { newSoldierType, cost };
};
