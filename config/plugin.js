'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    // for sequelize plugin
    "sequelize": {
      enable: true,
      package: 'egg-sequelize',
    },
    
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
};
