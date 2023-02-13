import { DataTypes } from 'sequelize';
import db from '../db/connection';


const activityType = db.define('ActivityType', {
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    }
});

export default activityType;