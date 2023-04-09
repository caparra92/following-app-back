import * as dotenv from 'dotenv';

dotenv.config();
//====================
//ENV VARS
//====================
let username;
let password;
let database;
let host;

//=====================
//    PORT
//=====================
export const port: Number = parseInt(<string>process.env.PORT, 10) || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

//=====================
//    EXPIRATION Token
//=====================

export const EXPIRATION: any = 60 * 60 * 24 * 60;
process.env.EXPIRATION = EXPIRATION;

//=====================
//    SEED
//=====================
export const SEED: string = process.env.SEED || 'este-es-el-seed-de-desarrollo';
//=====================
//    ENV
//=====================
const node_env = process.env.NODE_ENV as string;

if(node_env !== 'development'){
    username = process.env.USRNAME as string;
    password = process.env.PASSWORD as string;
    database = process.env.DATABASE as string;
    host = process.env.HOST as string; 
} else {
    username = process.env.DEVUSRNAME as string;
    password = process.env.DEVPASSWORD as string;
    database = process.env.DEVDATABASE as string;
    host = process.env.DEVHOST as string; 
}

interface ConfigurationObject {
    dev: any,
    test: any,
    prod: any
}

const config: any = {
    development: {
        db: {
            username,
            password,
            database,
            host
        }
    },
    test: {},
    production: {
        db: {
            username,
            password,
            database,
            host
        }
    }
}
console.log("CONFIG PROD username is:::"+config.production.db.username)
console.log("CONFIG PROD password is:::"+config.production.db.password)
console.log("CONFIG PROD database is:::"+config.production.db.database)
console.log("CONFIG PROD host is:::"+config.production.db.host)
console.log("Config env is:::"+config[node_env])

export const env =  config[node_env];