import { DataTypes } from 'sequelize';
import db from '../db/connection';


const activity = db.define('activity', {
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    activity_type_id: {
        type: DataTypes.STRING
    }
},{freezeTableName:true});

export default activity;