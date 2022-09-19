import { Application, Request, Response } from 'express';
import * as cors from 'cors';
import SessionController from '../modules/session/session.controller';
import authMiddleware from '../modules/middleware/auth.middleware';

export class SessionRoutes {

    session_controller: SessionController = new SessionController();

    public route(app: Application) {

        app.options('/v1/loginUser', cors);
        app.post('/v1/loginUser', cors(), (req: Request, res: Response) => {
            this.session_controller.loginUser(req, res);
        });

        app.get('/v1/user', cors(), authMiddleware, (req: Request, res: Response) => {
            this.session_controller.getUser(req, res);
        });

        app.post('/v1/createUser', cors(), (req: Request, res: Response) => {
            this.session_controller.createUser(req, res);
        });

        app.delete('/v1/user/:id', cors(), (req: Request, res: Response) => {
            this.session_controller.deleteUser(req, res);
        });

    }
}