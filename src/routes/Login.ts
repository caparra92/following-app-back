import { Request, Response, Router } from 'express';
import User from '../models/User';
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

        let { body } = req;
        try {
            const user = await User.findOne({
                where: {
                    email: body.email
                }
            });

            if(!user || !bcrypt.compareSync(body.password, user?.dataValues.password)) {
                return res.status(400).json({
                    error : 'Error during authentication, please check email or password'
                });
            }
            let token = jwt.sign({
                user,
            }, config.SEED,{ expiresIn: process.env.EXPIRACION });
    
            res.json({
                ok: true,
                user: user,
                token
              });
        } catch (error) {
            res.status(500).json({
                msg: 'Server error',
                error
            });
        }

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