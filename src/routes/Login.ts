import { Request, Response, Router } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
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
            if(user?.dataValues.password) {
                delete user.dataValues.password;
            }
            
            let token = jwt.sign({
                user,
            }, config.SEED,{ expiresIn: process.env.EXPIRATION });

            let refreshToken = jwt.sign({
                user,
            }, config.SEED,{ expiresIn: '3d' });

            res.cookie('jwt', refreshToken, { 
                httpOnly: true,
                sameSite: false,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000});
    
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

    async refresh(req: Request, res: Response) {
        let { body } = req;
        const user = await User.findOne({
            where: {
                email: body.email
            }
        });
        //console.log(req);
        if(req.cookies?.jwt) {
            const refreshToken = req.cookies.jwt;
            console.log(`Refresh token: ${refreshToken}`);
            jwt.verify(refreshToken, config.SEED, 
                (err: any) => {
                    if (err) {
                        // Wrong Refesh Token
                        return res.status(406).json({ message: 'Unauthorized with error'+ err });
                    }
                    else {
                        // Correct token we send a new access token
                        const token = jwt.sign({
                            user
                        }, config.SEED, {
                            expiresIn: process.env.EXPIRATION
                        });
                        return res.json({ token });
                    }
                })
            } else {
                return res.status(406).json({ message: 'Unauthorized' });
            }
    }

    async logout(req: Request, res: Response) {
        res.send('Logout successfull');
    }

    routes() {
        this.router.post('/', this.login);
        this.router.post('/refresh', this.refresh);
        this.router.get('/', this.logout);
    }
}

const login = new Login();
export default login.router;