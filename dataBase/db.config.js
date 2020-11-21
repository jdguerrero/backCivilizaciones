const dbconfig = {
    HOST: "localhost",
    USER: "userciv",
    PASSWORD: "Civ-1234",
    DB: "dbCivilizaciones",
    dialect: "mysql",
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = dbconfig;