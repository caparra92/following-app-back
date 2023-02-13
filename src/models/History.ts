import { DataTypes } from 'sequelize';
import db from '../db/connection';


const history = db.define('History', {
    date: {
        type: DataTypes.DATE
    },
    item: {
        type: DataTypes.STRING
    },
    value: {
        type: DataTypes.INTEGER
    }
});

export default history;