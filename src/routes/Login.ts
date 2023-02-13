import { Request, Response, Router } from 'express';
import {User} from '../models/User';
import  {verificaToken, verificaAdminRole} from '../middlewares/auth';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as config from '../config/config';

class Login {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async login(req: Request, res: Response) {
        
       

    }

    async logout(req: Request, res: Response) {
        res.send('Logout')
    }

    routes() {
        this.router.post('/', this.login);
        this.router.get('/', this.logout);
    }
}

const login = new Login();
export default login.router;