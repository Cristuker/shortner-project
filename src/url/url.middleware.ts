import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  private readonly validApiKeys: string[] = ['Teddy_API'];

  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'POST' && req.url === '/url/click') {
        const apiKey = req.headers['api-key'];
        if (this.validApiKeys.includes(String(apiKey))) {
          next();
        } else {
          throw new UnauthorizedException('Invalid API key');
        }
    } else {
        next();
    }

  }
}
