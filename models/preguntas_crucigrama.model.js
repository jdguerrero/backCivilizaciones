const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const PreguntaCrucigrama = sequelize.define(
        "PreguntaCrucigrama",
        {
            idPreguntaCrucigrama: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            pregunta: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            tableName: "preguntas_crucigrama",
            timestamps: false
        }
    );
        return PreguntaCrucigrama;
}