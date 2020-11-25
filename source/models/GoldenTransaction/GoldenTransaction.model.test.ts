import { GoldenTransaction, IGoldenTransactionParams } from './GoldenTransaction.model';

describe('GoldenTransaction model test', () => {
  it('Basic testing', () => {
    const params: IGoldenTransactionParams = { amount: 1, description: 'test' };
    const goldenT = new GoldenTransaction(params);
    expect(goldenT.amount).toEqual(params.amount);
    expect(goldenT.description).toEqual(params.description);
    expect(goldenT.timestamp).toBeDefined();
  });
});
