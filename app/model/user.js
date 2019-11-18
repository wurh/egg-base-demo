
'use strict';

module.exports = app => {
    const { 
        INTEGER, 
        DATE,
        STRING,
     } = app.Sequelize;
  
    const User = app.model.define('user', {
        name:STRING(45),
        group_id:INTEGER,
        gender:INTEGER,
        age:INTEGER,
        created_at:DATE,
        updated_at:DATE,
    });
    User.associate = () => {
        app.model.User.belongsTo(app.model.Usergroup,{ foreignKey:'group_id',targetKey:'id'});
      }
    return User;
  };