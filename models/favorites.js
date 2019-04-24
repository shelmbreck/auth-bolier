'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorites = sequelize.define('favorites', {
    id: DataTypes.INTEGER,
    url: DataTypes.STRING,
    label: DataTypes.STRING,
    image: DataTypes.STRING,
    uri: DataTypes.STRING,
    foodId: DataTypes.STRING
  }, {});
  favorites.associate = function(models) {
    // associations can be defined here
  };
  return favorites;
};