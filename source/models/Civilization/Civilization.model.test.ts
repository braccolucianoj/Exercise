import config from 'config';
import { Soldier } from '../Soldier';
import { ARCHER_SOLDIER_NAME, KNIGHT_SOLDIER_NAME, PIKEMAN_SOLDIER_NAME } from '../../constants';
import { createChineseArmy, createByzantineArmy, createEnglishArmy } from './Civilization.model';

describe('Civilization model test', () => {
  const TestAmountTypeSoldiers = (soldiers: any, type: string, initialArmy: any) => {
    {
      expect(soldiers.filter((x: Soldier) => x.type === type)).toHaveLength(initialArmy[type]);
    }
  };

  [
    { values: config.get('civilizations.chinese'), creator: createChineseArmy },
    { values: config.get('civilizations.byzantine'), creator: createByzantineArmy },
    { values: config.get('civilizations.english'), creator: createEnglishArmy },
  ].forEach((test: any) => {
    const {
      values: { initialArmy, name },
      creator,
    } = test;
    it(`createArmy test for civilization ${name}`, () => {
      const army = creator();
      expect(army.battlesHistory).toHaveLength(0);
      expect(army.goldenTransactions).toHaveLength(0);
      expect(army.civilizationName).toEqual(name);
      expect(army.goldenCoins).toEqual(config.get('initialGoldenPoints'));
      const totalSoldiers = Object.values(army.soldiers);
      TestAmountTypeSoldiers(totalSoldiers, PIKEMAN_SOLDIER_NAME, initialArmy);
      TestAmountTypeSoldiers(totalSoldiers, ARCHER_SOLDIER_NAME, initialArmy);
      TestAmountTypeSoldiers(totalSoldiers, KNIGHT_SOLDIER_NAME, initialArmy);
    });
  });
});
