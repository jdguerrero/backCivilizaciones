const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const EstiloVida = sequelize.define(
        "EstiloVida",
        {
            idEstiloVida: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            descripcionEstiloVida: {
                type: DataTypes.STRING(1000),
                allowNull: false
            },
            imagenEstiloVida: {
                type: DataTypes.STRING(500)
            }
        },
        {
            tableName: "estilosVida",
            timestamps: false
        }
    );
        return EstiloVida;
}