import { Sequelize } from "sequelize";
import { env } from '../config/config.js';

//DEV
//========================
const devSeq = new Sequelize(env.db.devDatabase, env.db.devUsername, env.db.devPassword, {
    host: env.db.devHost,
    dialect: 'mysql',
    logging: true
});

//PROD
//========================
const prodSeq = new Sequelize(env.db.database, env.db.username, env.db.password, {
    host: env.db.host,
    dialect: 'mysql',
    logging: true
});

const db = env === 'dev' ? devSeq : prodSeq;

// console.log(db)

export default db;