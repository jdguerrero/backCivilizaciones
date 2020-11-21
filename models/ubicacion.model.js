const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const Ubicacion = sequelize.define(
        "Ubicacion",
        {
            idUbicacion: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            departamento: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            imgMapa: {
                type: DataTypes.STRING(500)
            }
        },
        {
            tableName: "ubicaciones",
            timestamps: false
        }
    );
        return Ubicacion;
}