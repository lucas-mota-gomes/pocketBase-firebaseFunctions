import { Request, Response, NextFunction } from 'express';
import { unauthorized } from "../common/common.service";
import SessionService from "../session/session.service";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {

  if (req.headers && req.headers.authorization && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    try {
      const bearerToken = req.headers.authorization.split(' ')[1];
      new SessionService().verifyIdToken(bearerToken).then((response) => {
        next();
      }).catch((error: string) => {
        unauthorized('error on token validation', error, res);
      })
      next();
    } catch (error) {
      unauthorized('error on token validation', error, res);
    }
  } else {
    unauthorized('token was not passed', null, res);
  }
}

export default authMiddleware;