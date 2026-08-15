import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

class ChangePasswordDto {
  @IsString()
  @MinLength(8)
  password: string;
}

class ChangeEmailDto {
  @IsEmail()
  email: string;
}

class ChangeUsernameDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(
      loginUserDto.username,
      loginUserDto.password,
      loginUserDto.role,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid username, password, or role');
    }
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@Req() req) {
    return this.authService.publicUser(req.user.id);
  }

  @Post('logout')
  logout() {
    return { message: 'Logged out successfully' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('change-password')
  changePassword(@Body() body: ChangePasswordDto, @Req() req) {
    return this.authService.changePassword(req.user.id, body.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('change-email')
  changeEmail(@Body() body: ChangeEmailDto, @Req() req) {
    return this.authService.changeEmail(req.user.id, body.email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('change-username')
  changeUsername(@Body() body: ChangeUsernameDto, @Req() req) {
    return this.authService.changeUsername(req.user.id, body.username);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete-account')
  deleteAccount(@Req() req) {
    return this.authService.deleteAccount(req.user.id);
  }
}
