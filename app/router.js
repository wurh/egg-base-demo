'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/user/list', controller.user.admin.getUser);
  router.post('/api/user/add', controller.user.admin.addUser);
  router.post('/api/user/update', controller.user.admin.updateUser);
  router.post('/api/user/del', controller.user.admin.delUser);
};
