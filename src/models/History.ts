import { DataTypes } from 'sequelize';
import db from '../db/connection';


const history = db.define('history', {
    date: {
        type: DataTypes.DATE
    },
    value: {
        type: DataTypes.INTEGER
    },
    item_id: {
        type: DataTypes.INTEGER
    },
    activity_id: {
        type: DataTypes.INTEGER
    }
},{freezeTableName:true});

export default history;