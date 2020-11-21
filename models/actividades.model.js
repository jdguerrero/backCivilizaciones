const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const Actividad = sequelize.define(
        "Actividad",
        {
            idActividad: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            tableName: "actividades",
            timestamps: false
        }
    );
        return Actividad;
}