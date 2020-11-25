export interface IGoldenTransactionParams {
  amount: number;
  description: string;
}

export interface IGoldenTransaction extends IGoldenTransactionParams {
  timestamp: number;
}

export class GoldenTransaction {
  amount: number;
  timestamp: number;
  description: string;

  constructor(props: IGoldenTransactionParams) {
    this.amount = props.amount;
    this.description = props.description;
    this.timestamp = Date.now();
  }
}
