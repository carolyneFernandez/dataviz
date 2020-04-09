'use strict';
module.exports = (sequelize, DataTypes) => {
    const Wind = sequelize.define('Wind', {
        direction_degree: DataTypes.DECIMAL,
        direction_code: DataTypes.STRING,
        direction_name: DataTypes.STRING,
        speed: DataTypes.DECIMAL,
        speed_name: DataTypes.STRING
    }, {});
    Wind.associate = function(models) {
        // associations can be defined here
        Wind.hasMany(models.Data, {
            foreignKey: "windId"
        });
    };
    return Wind;
};