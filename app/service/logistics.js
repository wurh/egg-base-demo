// app/service/news.js
const Service = require('egg').Service;
const cheerio = require('cheerio');
const superagent = require('superagent');
const fs = require('fs');


class LogisticsService extends Service {

    async getOrderFromFile() {
        let data = fs.readFileSync('app/public/files/order20180719.txt', 'utf8');
        data = data.replace(/(\r\n)|(\n)/g, '')
        let dataArr = data.split(',');
        let results = [];
        for (let i = 0; i < dataArr.length; i++) {
            let orderLong = dataArr[i].split('|')[0];
            let orderTime = dataArr[i].split('|')[1];
            let orderYun = dataArr[i].split('|')[2];
            const resObj = await this.ctx.service.order.findByOrderId(orderLong);
            if (resObj.count === 0) {
                let isDeliver = await this.queryFrom4PX(orderYun);
                if (orderLong !== '' && orderYun !== '')
                    var obj = {
                        order_id: orderLong,
                        order_yun: orderYun,
                        order_time:orderTime,
                        is_deliver:isDeliver
                    }
                results.push(obj)
                await this.ctx.service.order.create(obj)
                console.log(orderYun+ '持久化成功');
            }else{
                console.log(orderYun+ '已存在！！！');
            }
        }
        return results
    }


    async queryFrom4PX(id) {

        let url = 'http://track.4px.com/query/' + id;
        let resultText = await getLinkDatas(url)
        const $ = cheerio.load(resultText);
        let logID = $('.result-title').text().replace(/(^\s+)|(\s+$)/g, "");

        let dhlUrl = 'https://www.logistics.dhl/v1/mailitems/track?number=' + logID;
        let resultData = await getDhlOrderData(dhlUrl)

        function getLinkDatas(url) {
            return new Promise(function (resolve, reject) {
                superagent.post(url)
                    .set('Accept', 'application/json')
                    .end(function (err, response) {
                        if (err || !response.ok) {
                            resolve({
                                'code': '101',
                                'msg': '获取数据失败!'
                            });
                        } else {
                            resolve(response.text);
                        }
                    });
            })
        }

        function getDhlOrderData(url) {
            console.log(url);
            return new Promise(function (resolve, reject) {
                superagent.get(url)
                    .set('Accept', 'application/json')
                    .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36')
                    .end(function (err, response) {
                        if (err || !response.ok) {
                            resolve({
                                'code': '101',
                                'msg': '获取数据失败!'
                            });
                        } else {
                            //console.log(response)
                            resolve(response.text);
                        }
                    });
            })
        }

        let isDeliver = false;
        let resultDataObj = JSON.parse(resultData);
        if (resultDataObj.data.mailItems[0].events[0].description.indexOf('DELIVERED') > -1) {
            isDeliver = true;
        }

        let result = {
            code: '200',
            msg: 'success',
            isDeliver: isDeliver,
            data: resultDataObj
        }
        return isDeliver
    }

}

module.exports = LogisticsService;