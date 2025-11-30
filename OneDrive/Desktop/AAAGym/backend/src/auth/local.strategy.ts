import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(username: string, password: string,role:string): Promise<any> {
    const user = await this.authService.validateUser(username, password,role);
    if (!user) {
      throw new UnauthorizedException('invalid credential and roles');
    }
    return user;
  }
}

// before the user does something it checks if the user is himself