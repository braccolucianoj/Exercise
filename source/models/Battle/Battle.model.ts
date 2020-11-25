export interface IBattleParams {
  armyAId: string;
  armyBId: string;
  winnerId?: string;
}

export interface IBattle extends IBattleParams {
  timestamp: number;
}

export class Battle implements IBattle {
  armyAId: string;
  armyBId: string;
  timestamp: number;
  winnerId?: string;

  constructor(props: IBattleParams) {
    this.armyAId = props.armyAId;
    this.armyBId = props.armyBId;
    this.timestamp = Date.now();
    this.winnerId = props.winnerId;
  }
}
