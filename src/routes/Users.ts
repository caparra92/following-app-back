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

        const user = await User.create({
            name: body.name,
            phone: body.phone,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10)
        });

        try {
            const UserSaved = await user.save();
            res.json({
                ok: true,
                user: UserSaved
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
        let { body } = req.body;

        try {
            const user = await User;
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
            await user?.destroy();
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
        this.router.get('/', this.get);
        this.router.get('/:id', [verificaToken, verificaAdminRole], this.getUser);
        this.router.post('/', this.create);
        this.router.put('/:id', [verificaToken, verificaAdminRole], this.update);
        this.router.delete('/:id', [verificaToken, verificaAdminRole], this.delete);
    }
}

const users = new Users();
export default users.router;