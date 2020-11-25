const {
  CHINESE_CIVILIZATION,
  ENGLISH_CIVILIZATION,
  BYZANTINE_CIVILIZATION,
  PIKEMAN_SOLDIER_NAME,
  ARCHER_SOLDIER_NAME,
  KNIGHT_SOLDIER_NAME,
} = require('../constants');

module.exports = {
  civilizations: {
    chinese: {
      name: CHINESE_CIVILIZATION,
      initialArmy: {
        [PIKEMAN_SOLDIER_NAME]: 2,
        [ARCHER_SOLDIER_NAME]: 25,
        [KNIGHT_SOLDIER_NAME]: 2,
      },
    },
    english: {
      name: ENGLISH_CIVILIZATION,
      initialArmy: {
        [PIKEMAN_SOLDIER_NAME]: 10,
        [ARCHER_SOLDIER_NAME]: 10,
        [KNIGHT_SOLDIER_NAME]: 10,
      },
    },
    byzantine: {
      name: BYZANTINE_CIVILIZATION,
      initialArmy: {
        [PIKEMAN_SOLDIER_NAME]: 5,
        [ARCHER_SOLDIER_NAME]: 8,
        [KNIGHT_SOLDIER_NAME]: 15,
      },
    },
  },
  initialGoldenPoints: 1000,
  wonBattlePrize: 100,
};
