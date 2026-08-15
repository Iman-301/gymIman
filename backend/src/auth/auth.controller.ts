import { Body, Controller, Delete, HttpException, HttpStatus, Patch, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Post('register')
    create(@Body() createUserDto:CreateUserDto):Promise<User>{
        return this.authService.create(createUserDto);
    }
    // @UseGuards(AuthGuard('local'))
    // @Post('login')
    // // here the user enters username and password in the body the authGuard local.strategy will return the user if valid and validity is checked by the req in @Req have the whole user data because the vaidate function check the username and password in the in the body with the one in the userrepo instance from the user entity if the same user is returned as a result excludiing the password 
    // async login(@Body() loginUserDto: LoginUserDto,@Req() req){
    //     console.log(req.user)
    //     return this.authService.login(req.user)
    // }
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto, @Req() req) {
    const { username, password, role } = loginUserDto;

    // Validate user with role
    const user = await this.authService.validateUser(username, password, role);

    if (!user) {
        throw new UnauthorizedException('Invalid username, password, or role');
    }

    return this.authService.login(user)
    }

   
    @Post('logout')
    async logout(@Req() req) {
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
        }
        return { message: 'Logged out successfully' };
      });
      return { message: 'Logged out successfully' };
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Patch('change-password')
    async changePassword(@Body() body: {password: string},@Req() req){
        console.log('Request User ID:', req.user.id);
        return this.authService.changePassword(req.user.id, body.password)
    }
    @UseGuards(AuthGuard('jwt'))
    @Patch('change-email')
    async changeEmail(@Body() body: {email: string}, @Req() req){
        return this.authService.changeEmail(req.user.id
            , body.email)
    }
    @UseGuards(AuthGuard('jwt'))
    @Patch('change-username')
    async changeUsername(@Body() body: {username: string}, @Req() req){
        return this.authService.changeUsername(req.user.id, body.username)
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete('delete-account')
    async deletAccount(@Req() req){
        console.log('account deleted')
        return this.authService.deleteAccount(req.user.id)
       
    }



}
