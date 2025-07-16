import { Controller, All, Req } from '@nestjs/common';
import { toNodeHandler } from 'better-auth/node';
import { auth } from '../../utils/auth';

@Controller('auth')
export class AuthController {
  @All('*')
  async handleAuth(@Req() req: Request) {
    console.log('inside auth controller');
    console.log(req.url);
    toNodeHandler(auth);
    return [];
  }
}
