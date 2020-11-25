import config from 'config';
import { v4 as uuidv4 } from 'uuid';
import { ARCHER_SOLDIER_NAME, KNIGHT_SOLDIER_NAME, PIKEMAN_SOLDIER_NAME } from '../../constants';
import { Army } from '../Army';
import { Soldier } from '../Soldier';

const initialAmountGold: number = config.get('initialGoldenPoints');

interface SoldiersObject {
  [PIKEMAN_SOLDIER_NAME]: number;
  [ARCHER_SOLDIER_NAME]: number;
  [KNIGHT_SOLDIER_NAME]: number;
}

export const createArraySoldierType = (type: string, amount: number) =>
  new Array(amount).fill(undefined).map(() => new Soldier({ id: uuidv4(), soldierType: type }));

const createSoldiers = (params: SoldiersObject) => [
  ...createArraySoldierType(PIKEMAN_SOLDIER_NAME, params[PIKEMAN_SOLDIER_NAME]),
  ...createArraySoldierType(ARCHER_SOLDIER_NAME, params[ARCHER_SOLDIER_NAME]),
  ...createArraySoldierType(KNIGHT_SOLDIER_NAME, params[KNIGHT_SOLDIER_NAME]),
];

export const createChineseArmy = () => {
  const { name, initialArmy } = config.get('civilizations.chinese');
  return new Army({
    civilizationName: name,
    id: uuidv4(),
    soldiers: createSoldiers(initialArmy),
    initialGoldenCoins: initialAmountGold,
  });
};

export const createEnglishArmy = () => {
  const { name, initialArmy } = config.get('civilizations.english');
  return new Army({
    civilizationName: name,
    id: uuidv4(),
    soldiers: createSoldiers(initialArmy),
    initialGoldenCoins: initialAmountGold,
  });
};

export const createByzantineArmy = () => {
  const { name, initialArmy } = config.get('civilizations.byzantine');
  return new Army({
    civilizationName: name,
    id: uuidv4(),
    soldiers: createSoldiers(initialArmy),
    initialGoldenCoins: initialAmountGold,
  });
};
