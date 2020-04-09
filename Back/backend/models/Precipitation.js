'use strict';
module.exports = (sequelize, DataTypes) => {
    const Precipitation = sequelize.define('Precipitation', {
        mode: DataTypes.STRING,
        value: DataTypes.DECIMAL
    }, {});
    Precipitation.associate = function(models) {
        // associations can be defined here
        Precipitation.hasMany(models.Data, {
            foreignKey: "precipitationId"
        });
    };
    return Precipitation;
};