const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const TipoArte = sequelize.define(
        "TipoArte",
        {
            idTipoArte: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            nombreTipo: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            tableName: "tiposArte",
            timestamps: false
        }
    );
        return TipoArte;
}