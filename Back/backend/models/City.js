'use strict';
module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define('City', {
        code_city: DataTypes.INTEGER,
        name: DataTypes.STRING,
        department: DataTypes.STRING,
        x: DataTypes.DECIMAL,
        y: DataTypes.DECIMAL
    }, {});
    City.associate = function(models) {
        // associations can be defined here
        City.hasMany(models.Data, {
            foreignKey: "cityId"
        });
    };
    return City;
};