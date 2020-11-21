const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const Civilizacion = sequelize.define(
        "Civilizacion",
        {
            idCivilizacion: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            nombreCivilizacion: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            imagenCivilizacion: {
                type: DataTypes.STRING(500),
                unique: true
            }
        },
        {
            tableName: "civilizaciones",
            timestamps: false
        }
    );
        return Civilizacion;
}