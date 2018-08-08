// app/service/news.js
const Service = require('egg').Service;

class OrdersService extends Service {

    async create(order) {
        return this.ctx.model.Order.create(order);
    }

    //寻找根据ID找数据
    async findByOrderId(order_id) {
        const options = {
            attributes: [ 'id', 'order_id', 'created_at', 'updated_at' ],
            order: [[ 'created_at', 'desc' ]]
        };
        if (order_id) {
            options.where = {
                order_id,
            };
        }
        return this.ctx.model.Order.findAndCountAll(options);
    }
}

module.exports = OrdersService;


