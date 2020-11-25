import { Battle, IBattleParams } from './Battle.model';

describe('GoldenTransaction model test', () => {
  it('Basic testing', () => {
    const params: IBattleParams = { armyAId: '1', armyBId: '2', winnerId: '1' };
    const battle = new Battle(params);
    expect(battle.armyAId).toEqual(params.armyAId);
    expect(battle.armyBId).toEqual(params.armyBId);
    expect(battle.winnerId).toEqual(params.winnerId);
    expect(battle.timestamp).toBeDefined();
  });

  it('Basic testing without winner', () => {
    const params: IBattleParams = { armyAId: '1', armyBId: '2' };
    const battle = new Battle(params);
    expect(battle.armyAId).toEqual(params.armyAId);
    expect(battle.armyBId).toEqual(params.armyBId);
    expect(battle.winnerId).toBeUndefined;
    expect(battle.timestamp).toBeDefined();
  });
});
