// app/controller/news.js
const Controller = require('egg').Controller;

class LogisticsController extends Controller {
     async find() {
        const ctx = this.ctx;
        ctx.set("Access-Control-Allow-Origin", "*");
        ctx.set("Access-Control-Allow-Headers", "X-Requested-With");
        ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        ctx.set("X-Powered-By", ' 3.2.1');
        ctx.set("Content-Type", "application/json;charset=utf-8");
        ctx.body = await ctx.service.logistics.queryFrom4PX(ctx.queries.id[0]);
        //const newsList = await ctx.service.news.list(page);
        //await ctx.render('news/list.tpl', { list: newsList });
      }

      async getOrderFromFile(){
          const ctx = this.ctx;
          ctx.set("Access-Control-Allow-Origin", "*");
          ctx.set("Access-Control-Allow-Headers", "X-Requested-With");
          ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
          ctx.set("X-Powered-By", ' 3.2.1');
          ctx.set("Content-Type", "application/json;charset=utf-8");
          ctx.body = await ctx.service.logistics.getOrderFromFile();
      }

}

module.exports = LogisticsController;