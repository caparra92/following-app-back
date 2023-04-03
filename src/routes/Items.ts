import { Request, Response, Router } from 'express';
import Item from '../models/Item'
import History from '../models/History'
import  {verificaToken, verificaAdminRole} from '../middlewares/auth';
import { Sequelize, Op } from 'sequelize';

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
                activity_id: body.activityId
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

    async getHistoriesById(req: Request, res: Response) {
        let { id } = req.params;
        const { offset } = <any>req.params;
        try {
            const histories = await History.findAll({
                where: {
                    item_id: id
                },
                order: [
                    ['date', 'DESC']
                ],
                limit: [parseInt(offset), 9]
            });
            res.json({
                ok: true,
                histories
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }
    }

    async getHistoriesByItemId(req: Request, res: Response) {
        let { id } = req.params;
        try {
            const histories = await History.findAll({
                where: {
                    item_id: id
                },
                order: [
                    ['date', 'DESC']
                ]
            });
            res.json({
                ok: true,
                histories
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }
    }

    async getHistoriesByMonth(req: Request, res: Response) {
        const { id } = req.params;
        const { month } = req.params;

        try {
            const histories = await History.findAll({
                where: {
                    item_id: id,
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('month', Sequelize.col('date')), month)
                      ],
                },
                order: [
                    ['date', 'DESC']
                ]
            });
            res.json({
                ok: true,
                histories
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
        this.router.get('/',verificaToken, this.get);
        this.router.get('/:id',verificaToken, this.getItem);
        this.router.get('/:id/:offset/histories',verificaToken, this.getHistoriesById);
        this.router.get('/:id/histories',verificaToken, this.getHistoriesByItemId);
        this.router.get('/:id/histories/:month',verificaToken, this.getHistoriesByMonth);
        this.router.post('/',verificaToken, this.create);
        this.router.put('/:id',verificaToken, this.update);
        this.router.delete('/:id',verificaToken, this.delete);
    }
}

const items = new Items();
export default items.router;