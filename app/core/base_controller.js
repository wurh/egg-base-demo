'use strict';

const {Controller} = require('egg');

const ErrorObj = require('../common/en.js');

class BaseController extends Controller {
    get user() {
        return this.ctx.session.user;
    }

    // 成功方法封装
    success(data) {
        let result = {}
        if(data) result = data;
        this.ctx.body = {
            code: 200,
            msg: 'success',
            data:result,
        };
    }

    // 异常返回封装
    fail(key) {
        const code = ErrorObj[key][0]
        const msg = ErrorObj[key][1]
        this.ctx.body = {
            code,
             msg,
        };
    }

    notFound(msg) {
        const message = msg || 'not found';
        this.ctx.throw(404, message);
    }
}
module.exports = BaseController;