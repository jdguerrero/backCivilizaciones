const dbconfig = {
    HOST: "r1bsyfx4gbowdsis.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    USER: "ztk178i2md024yoe",
    PASSWORD: "p3ackrgqezkjt4yh",
    DB: "l3ujgicuvbg4kk7p",
    dialect: "mysql",
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = dbconfig;