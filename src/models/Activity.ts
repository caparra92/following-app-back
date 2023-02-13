import { DataTypes } from 'sequelize';
import db from '../db/connection';


const activity = db.define('Activity', {
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    }
});

export default activity;