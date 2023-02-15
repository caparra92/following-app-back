import { Request, Response, Router } from 'express';
import Item from '../models/Item'
import  {verificaToken, verificaAdminRole} from '../middlewares/auth';

class Items {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async create(req: Request, res: Response) {
        
        let { body } = req;
        
        try {
            
            const item = await Item.create({
                name: body.name,
                description: body.description,
                activity_id: body.activity_id
            });
            await item.save();
            res.json({
                ok: true,
                item
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
            const items = await Item.findAll();
            res.json(items);
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error
            }); 
        }
    }

    async getItem(req: Request, res: Response) {

        let { id } = req.params;

        try {
            const item = await Item.findByPk(id);
            
            res.json({
                ok: true,
                item
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
            const item = await Item.findByPk(id);
            
            if(!item) {
                return res.status(404).json({
                    msg: 'Item does not exist!'
                });
            }
            
            await item.update(body);
            
            res.json({
                ok: true,
                item
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
            const item = await Item.findByPk(id);
            if(!item) {
                return res.status(404).json({
                    msg: 'Item does not exist!'
                });
            }
            
            await item.destroy();
            res.json({
                ok: true,
                message: 'Item deleted successfully'
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
        this.router.get('/:id', this.getItem);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}

const items = new Items();
export default items.router;