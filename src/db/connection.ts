import { Sequelize } from "sequelize";

const db = new Sequelize('following-app', 'root', 'Galo200992', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true
});

export default db;