'use strict';

const Controller = require('../../core/base_controller');

/**
 * @Controller User
 */
class UserController extends Controller {
    
    async getUser(){
        const { ctx, app } = this;
        const { Sequelize } = this.app.config.sequelize;
        const { Op } = Sequelize;
        try {
            const {
                size,
                page,
                name,
            } = ctx.query;
            const offset = size * (page - 1)
            const limit = parseInt(size, 10);
            if (!page || !size) {
                this.fail('PARAMS_ERROR')
                return;
            }
            let userquery = {};
            if (name) {
                userquery.name = {
                    [Op.like]: `%${name}%` 
                  }
            }
            const res = await ctx.service.user.admin.queryUsersCount({
                offset,
                limit,
                where: userquery,
                order: [
                    ['created_at', 'DESC'],
                ],
            })
            this.success(res);
        } catch (error) {
            this.fail('API_ERROR')
            console.log(error);
        }
    }
        
    async addUser(){
        const { ctx, app } = this;
        try {
            const {
                name,
                group_id,
                gender,
                age,
            } = ctx.request.body;
            const obj = {
                name,
                group_id,
                gender,
                age,
            }
            const res = await ctx.service.user.admin.addUser(obj)
            this.success(res);
        } catch (error) {
            this.fail('API_ERROR')
        }
    }

    async updateUser(){
        const { ctx, app } = this;
        try {
            const {
                id,
                name,
                group_id,
                gender,
                age,
            } = ctx.request.body;
            const obj = {
                name,
                group_id,
                gender,
                age,
            }
            const res = await this.ctx.service.user.admin.updateUser(id,obj)
            this.success(res);
        } catch (error) {
            this.fail('API_ERROR')
            console.log(error);
        }
    }
        
        
    async delUser(){
        const { ctx, app } = this;
        const {
            id,
        } = ctx.request.body;
        try {
            const res = await this.ctx.service.user.admin.delUser(id)
            this.success(res);
        } catch (error) {
            this.fail('API_ERROR')
        }
    }
}

module.exports = UserController;
