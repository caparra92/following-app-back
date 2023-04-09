import { Sequelize } from "sequelize";
import { env } from '../config/config';


const node_env = process.env.NODE_ENV;
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

const db = node_env === 'dev' ? devSeq : prodSeq;
// console.log(node_env)

export default db;