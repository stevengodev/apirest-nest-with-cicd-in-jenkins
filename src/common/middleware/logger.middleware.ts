
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request Url', req.url);
    console.log('Method: ', req.method)
    next();
  }
}


// Esta clase fue creada solo para ver el funcionamiento de los middleware en NestJS
// Su proposito solo es mostrar en consola la request
