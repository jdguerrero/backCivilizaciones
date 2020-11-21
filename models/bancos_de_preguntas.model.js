const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const BancoDePreguntas = sequelize.define(
        "BancoDePreguntas",
        {
            idBancoPreguntas: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            nombreBancoPreguntas: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            tableName: "bancos_de_preguntas",
            timestamps: false
        }
    );
        return BancoDePreguntas;
}