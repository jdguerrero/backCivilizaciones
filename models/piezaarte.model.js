const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const PiezaArte = sequelize.define(
        "PiezaArte",
        {
            idPiezaArte: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            nombrePieza: {
                type: DataTypes.STRING,
                allowNull: false
            },
            imagenPieza: {
                type: DataTypes.STRING(500)
            }
        },
        {
            tableName: "piezasArte",
            timestamps: false
        }
    );
        return PiezaArte;
}