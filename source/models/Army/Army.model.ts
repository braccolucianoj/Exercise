import _ from 'lodash';
import config from 'config';
import { Soldier } from '../Soldier';
import trainSoldier from '../../services/training.service';
import transformSoldier from '../../services/transformation.service';
import { GoldenTransaction } from '../GoldenTransaction/GoldenTransaction.model';
import { Battle } from '../Battle/Battle.model';

export interface IArmyParams {
  id: string;
  soldiers: Soldier[];
  initialGoldenCoins: number;
  civilizationName: string;
}

interface SoldierStruct {
  [id: string]: Soldier;
}

interface IArmy {
  id: string;
  civilizationName: string;
  goldenCoins: number;
  soldiers: SoldierStruct;
  goldenTransactions: GoldenTransaction[];
  battlesHistory: Battle[];
  amountPounts(): number;
  trainSoldier(soldierId: string): void;
  transformSoldier(soldierId: string): void;
  updateGoldenCoins(coins: number, description: string): void;
}

export class Army implements IArmy {
  id: string;
  goldenCoins: number;
  soldiers: SoldierStruct;
  civilizationName: string;
  goldenTransactions: GoldenTransaction[];
  battlesHistory: Battle[];

  constructor(params: IArmyParams) {
    this.id = params.id;
    this.civilizationName = params.civilizationName;
    this.goldenCoins = params.initialGoldenCoins;
    const soldiersAux = {} as SoldierStruct;
    params.soldiers.map((soldier: Soldier) => {
      soldiersAux[soldier.id] = soldier;
    });
    this.soldiers = soldiersAux;
    this.goldenTransactions = [];
    this.battlesHistory = [];
  }

  trainSoldier(soldierId: string) {
    const soldier = this.soldiers[soldierId];
    const { cost, pointsGained } = trainSoldier(soldier.type);
    this.checkUpdateGoldenCoins(-cost, `Trained soldier id ${soldier.id} with type ${soldier.type}`);
    soldier.train(pointsGained);
  }

  transformSoldier(soldierId: string) {
    const soldier = this.soldiers[soldierId];
    const { cost, newSoldierType } = transformSoldier(soldier.type);
    if (cost) {
      this.checkUpdateGoldenCoins(-cost, `Trained soldier id ${soldier.id} with type ${soldier.type}`);
      soldier.transform(newSoldierType as string);
    }
  }

  amountPounts(): number {
    return Object.values(this.soldiers)
      .map((soldier) => soldier.points)
      .reduce((totalPoints, currentPoints) => totalPoints + currentPoints, 0);
  }

  private checkUpdateGoldenCoins(coins: number, description: string) {
    if (this.goldenCoins + coins < 0) throw new Error('Insuficient amount of gold');
    this.updateGoldenCoins(coins, description);
  }

  updateGoldenCoins(coins: number, description: string) {
    this.goldenCoins += coins;
    this.goldenTransactions.push(new GoldenTransaction({ amount: coins, description }));
  }

  addLostBattle(battle: Battle) {
    const soldiers = Object.values(this.soldiers);
    if (soldiers.length) {
      // Setting value lesser than the minimum soldier points
      // Out of the domain
      let largest1 = { points: -1 } as any;
      let largest2 = { points: -1 } as any;
      soldiers.forEach((soldierAux) => {
        if (largest1.points < soldierAux.points) {
          largest2 = largest1;
          largest1 = soldierAux;
        } else if (largest2.points < soldierAux.points) {
          largest2 = soldierAux;
        }
      });
      this.soldiers = _.omit(this.soldiers, [largest1.id, largest2.id]);
    }
    this.battlesHistory.push(battle);
  }

  addWonBattle(battle: Battle) {
    this.updateGoldenCoins(config.get("wonBattlePrize"), `Battle won`);
    this.battlesHistory.push(battle);
  }

  addDrawBattle(battle: Battle) {
    const soldiersIDs = Object.keys(this.soldiers);
    const amountSoldiers = soldiersIDs.length;
    const soldierID = soldiersIDs[_.random(amountSoldiers - 1, false)];
    this.soldiers = _.omit(this.soldiers, soldierID);
    this.battlesHistory.push(battle);
  }
}
