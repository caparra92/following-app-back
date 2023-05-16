import { DataTypes } from 'sequelize';
import db from '../db/connection';


const activityType = db.define('activitytype', {
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    user_id : {
        type: DataTypes.STRING
    }
},{freezeTableName:true});

export default activityType;