import { Router, Request, Response, NextFunction } from 'express';
const Heroes = require('../data');

export class HeroRouter {
    router: Router

    //init the hero router
    constructor() {
        this.router = Router();
        this.init();
    }


    //GET all heroes
    public getAll(req: Request, res: Response, next: NextFunction) {
        res.send(Heroes);
    }

    //get one hero by id
    public getOne(req: Request, res: Response, next: NextFunction) {
        let query = parseInt(req.params.id);
        let hero = Heroes.find(hero => hero.id === query);
        if (hero) {
            res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                    hero
                })
        } else {
            res.status(404)
                .send({
                    message: 'No hero found with given id',
                    status: res.status
                })
        }
    }

    //take each handler and attach to one of the express router's enpoint
    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
    }
}

//create the HeroRouter, export its configured Express.Router
const heroRoutes = new HeroRouter();
heroRoutes.init();

export default heroRoutes.router;