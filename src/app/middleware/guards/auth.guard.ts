import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { environment } from '../../../environments/environment';
import { IResponsePattern, patternError } from '../../models/express.model';
import { IDecodedToken } from '../../models/user.model';
import User from '../../schemas/user.schema';

class AuthGuard {
  public async isAuthenticated(request: Request, response: Response<IResponsePattern>, next: NextFunction): Promise<Response | void> {
    try {
      const token = request.headers.authorization?.split(' ')[1];
      if (!token) {
        return response.status(401).send(patternError(undefined, 'Not authenticated'));
      }

      request.token = jwt.verify(token, environment.authentication.key) as IDecodedToken;

      return AuthGuard.exists(request, response, next);
    } catch (error) {
      return response.status(500).send(patternError(error, error.message));
    }
  }

  public async isHimSelf(request: Request, response: Response<IResponsePattern>, next: NextFunction): Promise<Response | void> {
    try {
      if (request.token.userId !== request.params.userId) {
        return response.status(401).send(patternError(undefined, 'Not authorized'));
      }

      return next();
    } catch (error) {
      return response.status(500).send(patternError(error, error.message));
    }
  }

  private static async exists(request: Request, response: Response<IResponsePattern>, next: NextFunction): Promise<Response | void> {
    try {
      const user = await User.findById(request.token.userId);
      if (!user) {
        return response.status(404).send(patternError(undefined, 'User not found'));
      }

      return next();
    } catch (error) {
      return response.status(500).send(patternError(error, error.message));
    }
  }
}
export default new AuthGuard();
