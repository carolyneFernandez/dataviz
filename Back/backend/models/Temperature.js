'use strict';
module.exports = (sequelize, DataTypes) => {
    const Temperature = sequelize.define('Temperature', {
        value: DataTypes.DECIMAL,
        value_max: DataTypes.DECIMAL,
        value_min: DataTypes.DECIMAL,
        feeling: DataTypes.DECIMAL
    }, {});
    Temperature.associate = function(models) {
        // associations can be defined here
        Temperature.hasMany(models.Data, {
            foreignKey: "temperatureId"
        });
    };
    return Temperature;
};