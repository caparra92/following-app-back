import { Request, Response, Router } from 'express';
import ActivityType from '../models/ActivityType'
import  {verificaToken, verificaAdminRole} from '../middlewares/auth';

class ActivityTypes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async create(req: Request, res: Response) {
        
        let { body } = req;
        
        try {
            
            const activityType = await ActivityType.create({
                name: body.name,
                description: body.description
            });
            await activityType.save();
            res.json({
                ok: true,
                activityType
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
            const activityTypes = await ActivityType.findAll();
            res.json(activityTypes);
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error
            }); 
        }
    }

    async getActivityType(req: Request, res: Response) {

        let { id } = req.params;

        try {
            const activityType = await ActivityType.findByPk(id);
            
            res.json({
                ok: true,
                activityType
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
            const activityType = await ActivityType.findByPk(id);
            
            if(!activityType) {
                return res.status(404).json({
                    msg: 'Activity type does not exist!'
                });
            }
            
            await activityType.update(body);
            
            res.json({
                ok: true,
                activityType
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
            const activityType = await ActivityType.findByPk(id);
            if(!activityType) {
                return res.status(404).json({
                    msg: 'Activity type does not exist!'
                });
            }
            
            await activityType.destroy();
            res.json({
                ok: true,
                message: 'Activity type deleted successfully'
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
        this.router.get('/:id',verificaToken, this.getActivityType);
        this.router.post('/',verificaToken, this.create);
        this.router.put('/:id',verificaToken, this.update);
        this.router.delete('/:id',verificaToken, this.delete);
    }
}

const activityTypes = new ActivityTypes();
export default activityTypes.router;