const dbconfig = {
    HOST: "r1bsyfx4gbowdsis.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    USER: "fc8392wz8xw2hgvl",
    PASSWORD: "dm4ofs6jqsg5bn9e",
    DB: "e2dd48n7y2i5k0m9",
    dialect: "mysql",
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = dbconfig;