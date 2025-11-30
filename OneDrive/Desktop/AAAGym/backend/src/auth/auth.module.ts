import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import { AuthService } from './auth.service';
import {User} from '../auth/entity/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesGuard } from './guard/roles.guard';

@Module({

  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
  PassportModule.register({defaultStrategy: 'jwt'}),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async(configService: ConfigService)=>({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {expiresIn: '1h'}
    }),
    inject: [ConfigService]
  })
],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,LocalStrategy],
  exports: [PassportModule,JwtModule]
})
export class AuthModule {}
