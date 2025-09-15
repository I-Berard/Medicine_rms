import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers['authorization'];
    if (!authHeaders){
      throw new UnauthorizedException("There are no Auth header");
    }

    const token = authHeaders.split(' ')[1];
    if(!token){
      throw new UnauthorizedException("No token provided")
    }

    try {
      const decoded = jwt.verify(token, "simple"); // the secret has to be updated 
      (req as any).user = decoded;
      next();

    }catch(err){

    }
    next();
  }
}
