import { DataTypes } from 'sequelize';
import db from '../db/connection';


const item = db.define('Item', {
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    }
});

export default item;