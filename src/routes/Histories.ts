import { Request, Response, Router } from 'express';
import History from '../models/History'
import  {verificaToken, verificaAdminRole} from '../middlewares/auth';

class Histories {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async create(req: Request, res: Response) {
        
        let { body } = req;
        
        try {
            
            const history = await History.create({
                date: body.date,
                value: body.value,
                item_id: body.item_id,
                activity_id: body.activity_id
            });
            await history.save();
            res.json({
                ok: true,
                history
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
            const history = await History.findAll();
            res.json(history);
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error
            }); 
        }
    }

    async getHistory(req: Request, res: Response) {

        let { id } = req.params;

        try {
            const history = await History.findByPk(id);
            
            res.json({
                ok: true,
                history
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
            const history = await History.findByPk(id);
            
            if(!history) {
                return res.status(404).json({
                    msg: 'history does not exist!'
                });
            }
            
            await history.update(body);
            
            res.json({
                ok: true,
                history
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
            const history = await History.findByPk(id);
            if(!history) {
                return res.status(404).json({
                    msg: 'Historie does not exist!'
                });
            }
            
            await history.destroy();
            res.json({
                ok: true,
                message: 'History deleted successfully'
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
        this.router.get('/:id', this.getHistory);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}

const history = new Histories();
export default history.router;