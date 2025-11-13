import { ForbiddenException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware { // A plain old middleware for authorization
  constructor(
    private configService: ConfigService
  ){}
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
      const secret = this.configService.get<string>("SECRET")!
      const decoded = jwt.verify(token, secret); // the secret has to be updated 
      (req as any).user = decoded;
      next();

    }catch(err){
      throw new ForbiddenException("The token is invalid");
    }
  }
}
