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

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

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

if(node_env !== 'dev'){
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

const config: ConfigurationObject = {
    dev: {
        db: {
            username,
            password,
            database,
            host
        }
    },
    test: {},
    prod: {
        db: {
            username,
            password,
            database,
            host
        }
    }
}

export const env =  config[node_env as keyof ConfigurationObject];