import { DataTypes } from 'sequelize';
import db from '../db/connection';


const history = db.define('history', {
    date: {
        type: DataTypes.DATE
    },
    item: {
        type: DataTypes.STRING
    },
    value: {
        type: DataTypes.INTEGER
    }
},{freezeTableName:true});

export default history;