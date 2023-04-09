import * as dotenv from 'dotenv';

dotenv.config();
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
//    DB
//=====================
const username = process.env.USRNAME as string;
const password = process.env.PASSWORD as string;
const database = process.env.DATABASE as string;
const host = process.env.HOST as string;
const node_env = process.env.NODE_ENV as string;

//DB DEV
//======================
const devUsername = process.env.DEVUSRNAME as string;
const devPassword = process.env.DEVPASSWORD as string;
const devDatabase = process.env.DEVDATABASE as string;
const devHost = process.env.DEVHOST as string;


interface ConfigurationObject {
    dev: any,
    test: any,
    prod: any
}

const config: ConfigurationObject = {
    dev: {
        db: {
            devUsername,
            devPassword,
            devDatabase,
            devHost
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

export let urlDB: any;

// if(process.env.NODE_ENV === 'dev') {
//     urlDB = '//localhost:3306';
// } else {
//     urlDB = process.env.HOST;
// }

process.env.HOST = urlDB;

export const env =  config[node_env as keyof ConfigurationObject];
