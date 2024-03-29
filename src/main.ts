import * as config from './config/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/Routes';
import users from './routes/Users';
import activities from './routes/Activities';
import activityTypes from './routes/ActivityTypes';
import items from './routes/Items';
import histories from './routes/Histories';
import login from './routes/Login';
import db from './db/connection';


class Server {

    public app: express.Application;
    constructor() {
        this.app = express();
        this.dbConnection();
        this.config();
        this.routes();
        // console.log(db.config)
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log("DB ONLINE");
        } catch (error: any) {
            throw new Error(error);
        }
    }

    config() {

        //Mysql
        
        //Settings
        this.app.set('port', process.env.PORT);
        process.env.NODE_ENV

        //middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(cookieParser());
    }

    routes() {
        this.app.use(routes);
        this.app.use('/api/users', users);
        this.app.use('/api/activities', activities);
        this.app.use('/api/activityTypes', activityTypes);
        this.app.use('/api/items', items);
        this.app.use('/api/histories', histories);
        this.app.use('/api/login', login);
    }

    start() {
        this.app.listen(config.port, () => {
            console.log('Server on port', config.port);
        })
    }
}

const server = new Server();
server.start();