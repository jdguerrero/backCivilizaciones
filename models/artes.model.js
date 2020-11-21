const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const Arte = sequelize.define(
        "Arte",
        {
            idArte: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            descripcion: {
                type: DataTypes.STRING(1000)
            }
        },
        {
            tableName: "artes",
            timestamps: false
        }
    );
        return Arte;
}