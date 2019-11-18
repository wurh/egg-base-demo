/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * 本地开发配置项
 */


module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   */
  const config = exports = {};
  
  // Mysql ORM
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: '12345678',
    pool: {
      max: 20,
      min: 0,
      idle: 10000
    },
    port: 3306,
    database: 'egg_base_demo',
    define: {
      underscored: true, // 注意需要加上这个， egg-sequelize只是简单的使用Object.assign对配置和默认配置做了merge, 如果不加这个 update_at会被转变成 updateAt故报错
      // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
      // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
      freezeTableName: true,
    },
  }

  return {
    ...config,
  };
};
