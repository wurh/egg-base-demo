'use strict';

const { Service } = require('egg');

/**
 * UserbaseService Object
 */
class UseradminService extends Service {

  async queryUsersCount(query) {
    return await this.ctx.model.User.findAndCountAll(query)
  }

  async queryUsers(query) {
    return await this.ctx.model.User.findAll(query)
  }

  async addUser(obj) {
    return await this.ctx.model.User.create(obj)
  }

  async updateUser(id, obj) {
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      this.ctx.status = 404;
      return;
    }
    await user.update(obj);
    this.ctx.status = 200;
  }

  async delUser(id) {
    const user = await this.ctx.model.User.findByPk(id);
    if (!user) {
      this.ctx.status = 404;
      return;
    }
    await user.destroy();
    this.ctx.status = 200;
  }

}

module.exports = UseradminService;