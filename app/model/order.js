'use strict';

/**
 *  商品model对象
 **/

module.exports = app => {
    const { STRING, INTEGER, DATE ,TEXT} = app.Sequelize;

    const Order = app.model.define('order', {
        id: {                     //数据ID
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order_id: {
            unique: true,
            type: STRING(100),
        },      //订单号
        order_yun: STRING(100),   //运单号
        order_time: STRING(100),   //下单时间
        is_deliver:STRING(100),     //是否发货
        created_at: DATE, //数据创建时间
        updated_at: DATE,//数据更新时间
    });


    return Order;
};
