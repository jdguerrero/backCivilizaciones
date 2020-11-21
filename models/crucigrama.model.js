const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const Crucigrama = sequelize.define(
        "Crucigrama",
        {
            idCrucigrama: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            nombreCrucigrama: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            tableName: "crucigrama",
            timestamps: false
        }
    );
        return Crucigrama;
}