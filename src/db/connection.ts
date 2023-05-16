import { Sequelize } from "sequelize";
import { env } from '../config/config';

//========================
//DB
//========================
export const db = new Sequelize(env.db.database, env.db.username, env.db.password, {
    host: env.db.host,
    dialect: 'mysql',
    logging: true
});

export default db;