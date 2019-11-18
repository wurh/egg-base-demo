'use strict';

const Controller = require('../core/base_controller');

class HomeController extends Controller {
  async index() {
    this.success({res:'Hi,egg'});
  }
}

module.exports = HomeController;
