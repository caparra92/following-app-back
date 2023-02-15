import { DataTypes } from 'sequelize';
import db from '../db/connection';


const item = db.define('item', {
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    activity_id: {
        type: DataTypes.STRING
    }
},{freezeTableName:true});

export default item;