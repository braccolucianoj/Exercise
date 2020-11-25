// The training is basically a function which takes
// the soldier type as input and returns the gained
// trained points
import _ from 'lodash';
import { ARCHER_SOLDIER_NAME, KNIGHT_SOLDIER_NAME, PIKEMAN_SOLDIER_NAME } from '../constants';

interface SingleTrainValues {
  cost: number;
  pointsGained: number;
}

interface MatrixTraining {
  [value: string]: SingleTrainValues;
}

export const TRAINING_COSTS: MatrixTraining = {
  [PIKEMAN_SOLDIER_NAME]: { cost: 3, pointsGained: 10 },
  [ARCHER_SOLDIER_NAME]: { cost: 7, pointsGained: 20 },
  [KNIGHT_SOLDIER_NAME]: { cost: 10, pointsGained: 30 },
};

export default (soldierType: string) => _.get(TRAINING_COSTS, soldierType, {} as SingleTrainValues);
