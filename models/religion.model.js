const DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, Sequelize) => {

    const Religion = sequelize.define(
        "Religion",
        {
            idReligion: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
                allowNull: false
            },
            nombreReligion: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            descripcionReligion: {
                type: DataTypes.STRING(1000),
                allowNull: false
            },
            imagenReligion: {
                type: DataTypes.STRING(500)
            }
        },
        {
            tableName: "religiones",
            timestamps: false
        }
    );
        return Religion;
}