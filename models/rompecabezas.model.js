const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const Rompecabezas = sequelize.define(
        "Rompecabezas",
        {
            idRompecabezas: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            nombreRompecabezas: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            imagenRompecabezas: {
                type: DataTypes.BLOB("long"),
                //allowNull: false
            },
            completado: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        },
        {
            tableName: "rompecabezas",
            timestamps: false
        }
    );
        return Rompecabezas;
}