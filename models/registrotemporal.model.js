const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const RegistroTemporal = sequelize.define(
        "RegistroTemporal",
        {
            idRegistroTemporal: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            añoAparicion: {
                type: DataTypes.STRING,
                allowNull: false
            },
            añoUltimoRegistro: {
                type: DataTypes.STRING,
                allowNull: false
            },
            descripcion: {
                type: DataTypes.STRING(1000)
            }
        },
        {
            tableName: "registrosTemporales",
            timestamps: false
        }
    );
        return RegistroTemporal;
}