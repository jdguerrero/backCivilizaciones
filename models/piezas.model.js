const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const Pieza = sequelize.define(
        "Pieza",
        {
            idPieza: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            imagenPieza: {
                type: DataTypes.BLOB("long"),
                //allowNull: false
            },
            ordenPieza: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: "piezas",
            timestamps: false
        }
    );
        return Pieza;
}