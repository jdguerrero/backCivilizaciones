const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const PreguntaQuiz = sequelize.define(
        "PreguntaQuiz",
        {
            idPreguntaQuiz: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            pregunta: {
                type: DataTypes.STRING(500),
                allowNull: false
            },
            respuesta1: {
                type: DataTypes.STRING(500),
                allowNull: false
            },
            respuesta2: {
                type: DataTypes.STRING(500),
                allowNull: false
            },
            respuestaCorrecta: {
                type: DataTypes.STRING(500),
                allowNull: false
            }
        },
        {
            tableName: "preguntas_quiz",
            timestamps: false
        }
    );
        return PreguntaQuiz;
}