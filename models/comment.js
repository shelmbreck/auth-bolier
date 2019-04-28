'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    favoriteId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    rating: DataTypes.DECIMAL,
  }, {});
  comment.associate = function(models) {
    // associations can be defined here
    models.comment.belongsTo(models.favorite)
  };
  return comment;
};
