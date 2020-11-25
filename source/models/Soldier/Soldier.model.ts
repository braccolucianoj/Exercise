import _ from 'lodash';
import { ARCHER_SOLDIER_NAME, KNIGHT_SOLDIER_NAME, PIKEMAN_SOLDIER_NAME } from '../../constants';

export const SoldierPointMatrix = {
  [PIKEMAN_SOLDIER_NAME]: 5,
  [ARCHER_SOLDIER_NAME]: 10,
  [KNIGHT_SOLDIER_NAME]: 20,
};

const getTypeInitialPoints = (type: string): number => _.get(SoldierPointMatrix, type, 0);

export interface ISoldierParams {
  id: string;
  soldierType: string;
}

export class Soldier {
  id: string;
  type: string;
  points: number;

  constructor(params: ISoldierParams) {
    this.id = params.id;
    this.type = params.soldierType;
    this.points = getTypeInitialPoints(params.soldierType);
  }

  train(newPoints: number) {
    this.points += newPoints;
  }

  transform(newSoldierType: string) {
    this.points += (getTypeInitialPoints(newSoldierType) - getTypeInitialPoints(this.type));
    this.type = newSoldierType;
  }
}
