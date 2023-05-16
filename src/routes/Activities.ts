import { Request, Response, Router } from 'express';
import Activity from '../models/Activity'
import  {verificaToken, verificaAdminRole} from '../middlewares/auth';
import Item from '../models/Item';

class Activities {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async create(req: Request, res: Response) {
        
        let { body } = req;
        
        try {
            const activity = await Activity.create({
                name: body.name,
                description: body.description,
                activity_type_id: body.activityTypeId,
                user_id: body.user
            });
            await activity.save();
            res.json({
                ok: true,
                activity
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }
    }

    async get(req: Request, res: Response) {

        let { id } = req.params;
        try {
            const activities = await Activity.findAll({
                where: {
                    user_id: id
                } 
            });
            res.json(activities);
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error
            }); 
        }
    }

    async getActivity(req: Request, res: Response) {

        let { id } = req.params;

        try {
            const activity = await Activity.findByPk(id);
            
            res.json({
                ok: true,
                activity
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }
    }

    async getItemsById(req: Request, res: Response) {
        let { id } = req.params;
        try {
            const items = await Item.findAll({
                where: {
                    activity_id: id
                }
            });
            res.json({
                ok: true,
                items
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
            const activity = await Activity.findByPk(id);
            
            if(!activity) {
                return res.status(404).json({
                    msg: 'Activity does not exist!'
                });
            }
            
            await activity.update(body);
            
            res.json({
                ok: true,
                activity
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
            const activity = await Activity.findByPk(id);
            if(!activity) {
                return res.status(404).json({
                    msg: 'Activity does not exist!'
                });
            }
            
            await activity.destroy();
            res.json({
                ok: true,
                message: 'Activity deleted successfully'
            });
        } catch (error) {
           return res.status(500).json({
               ok: false,
               error
           }); 
        }
    }

    routes() {
        this.router.get('/user/:id',verificaToken, this.get);
        this.router.get('/:id',verificaToken, this.getActivity);
        this.router.get('/:id/items',verificaToken, this.getItemsById);
        this.router.post('/',verificaToken, this.create);
        this.router.put('/:id',verificaToken, this.update);
        this.router.delete('/:id',verificaToken, this.delete);
    }
}

const activities = new Activities();
export default activities.router;