
//=====================
//    Puerto
//=====================
export const port: Number = parseInt(<string>process.env.PORT, 10) || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//=====================
//    Expiracion Token
//=====================

export const EXPIRACION: any = 60 * 60 * 24 * 60;
process.env.EXPIRACION = EXPIRACION;

//=====================
//    SEED
//=====================
export const SEED: string = process.env.SEED || 'este-es-el-seed-de-desarrollo';
//=====================
//    Base de datos
//=====================
export let urlDB: any;

if(process.env.NODE_ENV === 'dev') {
    urlDB = '//localhost:3306';
} else {
    urlDB = process.env.MYSQL_URI;
}

process.env.URLDB = urlDB;

