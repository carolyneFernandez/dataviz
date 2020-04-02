'use strict';
module.exports = (sequelize, DataTypes) => {
    const Data = sequelize.define('Data', {
        pression: DataTypes.DECIMAL,
        humidity: DataTypes.DECIMAL,
        weather: DataTypes.STRING,
        date: DataTypes.DATE
    }, {});
    Data.associate = function(models) {
        // associations can be defined here
        Data.belongsTo(models.Temperature, {
            foreignKey: 'id',
            target_Key: 'temperatureId'
        });

        Data.belongsTo(models.Wind, {
            foreignKey: 'id',
            target_Key: 'windId'
        });

        Data.belongsTo(models.Precipitation, {
            foreignKey: 'id',
            target_Key: 'precipitationId'
        });

        Data.belongsTo(models.Cloud, {
            foreignKey: 'id',
            target_Key: 'cloudId'
        });

        Data.belongsTo(models.City, {
            foreignKey: 'id',
            target_Key: 'cityId'
        });
    };
    return Data;
};