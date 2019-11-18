
'use strict';

module.exports = app => {
    const { 
        DATE,
        STRING,
     } = app.Sequelize;
  
    const Usergroup = app.model.define('usergroup', {
        name:STRING(45),
        created_at:DATE,
        updated_at:DATE,
    });
    Usergroup.associate = () => {
        app.model.Usergroup.hasMany(app.model.User,{ foreignKey:'group_id',targetKey:'id'});
      }
    return Usergroup;
  };