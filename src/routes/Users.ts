import { Request, Response, Router } from 'express';
import User from '../models/User';
import  {verificaToken, verificaAdminRole} from '../middlewares/auth';
import bcrypt from 'bcrypt';

class Users {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async create(req: Request, res: Response) {
        
        let { body } = req;
        
        try {
            const emailExists = await User.findOne({
                where: {
                    email: body.email
                }
            });
            if(emailExists) {
                return res.status(400).json({
                    msg: `Email ${body.email} already exists!`
                });
            } 
            const user = await User.create({
                name: body.name,
                email: body.email,
                password: bcrypt.hashSync(body.password, 10)
            });
            if(user?.dataValues.password || user?.dataValues.createdAt || user?.dataValues.updatedAt) {
                delete user.dataValues.password;
                delete user.dataValues.createdAt;
                delete user.dataValues.updatedAt;
            }
            await user.save();
            res.json({
                ok: true,
                user: user
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }
    }

    async get(req: Request, res: Response) {

        try {
            const Users = await User.findAll();
            res.json(Users);
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error
            }); 
        }
    }

    async getUser(req: Request, res: Response) {

        let { id } = req.params;

        try {
            const user = await User.findByPk(id);
            if(user?.dataValues.password) {
                delete user.dataValues.password;
            }
            res.json({
                ok: true,
                user: user
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }
    }

    async update(req: Request, res: Response) {
        
        let { id } = req.params;
        let { body } = req;

        try {
            const user = await User.findByPk(id);
            
            if(!user) {
                return res.status(404).json({
                    msg: 'User does not exist!'
                });
            }
            const emailExists = await User.findOne({
                where: {
                    email: body.email
                }
            });
            if(emailExists) {
                return res.status(400).json({
                    msg: `Email ${body.email} already exists!`
                });
            } 
            await user.update(body);
            
            res.json({
                ok: true,
                user
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }
    }

    async delete(req: Request, res: Response) {
        
        let { id } = req.params;

        try {
            const user = await User.findByPk(id);
            if(!user) {
                return res.status(404).json({
                    msg: 'User does not exist!'
                });
            }
            
            await user.destroy();
            res.json({
                ok: true,
                message: 'User deleted successfully'
            });
        } catch (error) {
           return res.status(500).json({
               ok: false,
               error
           }); 
        }
    }

    routes() {
        this.router.get('/',verificaToken, this.get);
        this.router.get('/:id',verificaToken, this.getUser);
        this.router.post('/', this.create);
        this.router.put('/:id',verificaToken, this.update);
        this.router.delete('/:id',verificaToken, this.delete);
    }
}

const users = new Users();
export default users.router;