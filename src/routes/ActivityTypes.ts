import { Request, Response, Router } from 'express';
import ActivityType from '../models/ActivityType'
import  {verificaToken, verificaAdminRole} from '../middlewares/auth';
import Activities from '../models/Activity';

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
                description: body.description,
                user_id: body.user
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

        let { id } = req.params;
        try {
            const activityTypes = await ActivityType.findAll({
                where: {
                    user_id: id
                }
            });
            res.json(activityTypes);
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error
            }); 
        }
    }

    async getActivitiesById(req: Request, res: Response) {
        let { id, user } = req.params;
        console.log(user)
        try {
            const activities = await Activities.findAll({
                where: {
                    activity_type_id: id,
                    user_id: user
                }
            });
            res.json({
                ok: true,
                activities
            });
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
        this.router.get('/user/:id',verificaToken, this.get);
        this.router.get('/:id',verificaToken, this.getActivityType);
        this.router.get('/:id/activities/user/:user',verificaToken, this.getActivitiesById);
        this.router.post('/',verificaToken, this.create);
        this.router.put('/:id',verificaToken, this.update);
        this.router.delete('/:id',verificaToken, this.delete);
    }
}

const activityTypes = new ActivityTypes();
export default activityTypes.router;