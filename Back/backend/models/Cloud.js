'use strict';
module.exports = (sequelize, DataTypes) => {
    const Cloud = sequelize.define('Cloud', {
        cover: DataTypes.INTEGER,
        name: DataTypes.STRING
    }, {});
    Cloud.associate = function(models) {
        // associations can be defined here
        Cloud.hasMany(models.Data, {
            foreignKey: "cloudId"
        });
    };
    return Cloud;
};