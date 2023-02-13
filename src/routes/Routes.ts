import { Request, Response, Router } from 'express';

class Routes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', (req: Request, res: Response) => res.send('API:/api'));
    }
}

const routes = new Routes();
routes.routes();

export default routes.router;