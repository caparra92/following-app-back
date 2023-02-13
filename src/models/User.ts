import { DataTypes } from 'sequelize';
import db from '../db/connection';


const user = db.define('user', {
    name: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
}, {freezeTableName:true});

export default user;