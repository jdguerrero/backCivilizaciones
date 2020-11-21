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
                allowNull: false,
                unique: true
            },
            respuesta1: {
                type: DataTypes.STRING(500),
                allowNull: false,
                unique: true
            },
            respuesta2: {
                type: DataTypes.STRING(500),
                allowNull: false,
                unique: true
            },
            respuestaCorrecta: {
                type: DataTypes.STRING(500),
                allowNull: false,
                unique: true
            }
        },
        {
            tableName: "preguntas_quiz",
            timestamps: false
        }
    );
        return PreguntaQuiz;
}