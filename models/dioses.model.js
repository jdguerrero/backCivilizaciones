const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const Dios = sequelize.define(
        "Dios",
        {
            idDios: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            nombreDios: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            imagenDios: {
                type: DataTypes.STRING(500)
            },
            descripcionDios: {
                type: DataTypes.STRING(1000),
                allowNull: false
            }
        },
        {
            tableName: "dioses",
            timestamps: false
        }
    );
        return Dios;
}