'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define('favorite', {
    userId: {
      type: DataTypes.INTEGER,
    },
    url: DataTypes.STRING,
    label: DataTypes.STRING,
    image: DataTypes.STRING,
    uri: DataTypes.STRING,
    foodId: DataTypes.STRING,
  }, {});
  favorite.associate = function(models) {
    // associations can be defined here
    // TODO favorite belongs to user
    models.favorite.belongsTo(models.user)
    models.favorite.hasMany(models.comment)

  };
  return favorite;
};