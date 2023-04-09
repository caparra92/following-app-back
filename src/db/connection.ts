import { Sequelize } from "sequelize";
import { env } from '../config/config';

// const node_env = process.env.NODE_ENV;
console.log("ENV:::"+env)
console.log("ENV is typeof: "+typeof env)
//========================
//DB
//========================
export const db = new Sequelize(env.db.database, env.db.username, env.db.password, {
    host: env.db.host,
    dialect: 'mysql',
    logging: true
});

console.log(db)

export default db;