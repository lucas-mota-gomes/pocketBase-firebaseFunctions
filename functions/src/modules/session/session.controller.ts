import { Request, Response } from 'express';
import { failureResponse, successResponse } from "../common/common.service";
// import { IAuthUser, ILoginUser } from './session.model';
import SessionService from "./session.service";
// import env from '../../../environment';

class SessionController {

    session_service: SessionService = new SessionService();

    loginUser(req: Request, res: Response){
        this.session_service.loginUser(req.body).then((result:any)=>{
            successResponse('Success', result, res);
        }).catch(error=>{
            failureResponse('Failure to get user' + error, error, res);
        })
    }

    getUser(req: Request, res: Response){
        this.session_service.getUser().then((result:any)=>{
            successResponse('Success', result, res);
        }).catch(error=>{
            failureResponse('Failure to get user' + error, error, res);
        })
    }

    createUser(req: Request, res: Response){
        this.session_service.createAuthUser(req.body).then((result:any)=>{
            this.session_service.createUser(req.body).then((userResult:any)=>{
                console.log(userResult);
                successResponse('user create successful', result, res);
            }).catch((error: string)=>{
                failureResponse('Failure to create user' + error, error, res);
            })
        }).catch((error: string)=>{
            failureResponse('Failure to create authUser' + error, error, res);
        })
    }

    deleteUser(req: Request, res: Response){
        this.session_service.deleteUser(req.params.id).then((result:any)=>{
            successResponse('user delete successful', result, res);
        }).catch((error: string)=>{
            failureResponse('Failure to delete user' + error, error, res);
        })
    }

}

export default SessionController;