import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ){}
  
  async create(createUserDto: CreateUserDto): Promise<User>{
    const hashedPassword=await bcrypt.hash(createUserDto.password,10);
    const user=this.userRepository.create({
        ...createUserDto,
        password: hashedPassword
       
    });
    return this.userRepository.save(user)
  }
  async validateUser(username: string, pass: string,role: string):Promise<any>{
    const user=await this.userRepository.findOne({where: {username}});
    if (user && user.role===role && (await bcrypt.compare(pass, user.password))){
      const {password, ...result}=user;
      return result
    }
    return null;
  }
// after validation i mean after the validateUser an accessToken made form the signed payload 
// The generated JWT can then be sent back to the client, allowing the client to include it in the Authorization header of subsequent requests to access protected routes in your application.
// the login tke the user because the login proceess will return user in the @Req req 
  async login(user: User){
    const payload={username: user.username, sub: user.id, role: user.role, email: user.email}
    console.log(payload)
    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
      // this means include user ifo in the token
    }
  }

  async changePassword(userId: number, newPassword: string): Promise<User>{
      console.log('User  ID:', userId);
        const hashedPassword=await bcrypt.hash(newPassword, 10)
        await this.userRepository.update(userId, {password: hashedPassword})
        return this.userRepository.findOne({where: {id: userId}})

  }
 
  async changeEmail(userId: number, newEmail: string):Promise<User>{
    const user=await this.userRepository.findOne({where: {id: userId}})
    if (!user){
      throw new NotFoundException('úser not found')
    }
    user.email=newEmail;
    return this.userRepository.save(user);
  }

  async changeUsername(id: number, newUsername: string): Promise<User>{
    const user=await this.userRepository.findOne({where: {id: id}});
    if (!user){
      throw new NotFoundException('user not found')
    }
    user.username=newUsername;
    return this.userRepository.save(user);
  }


  async deleteAccount(userId: number): Promise<void>{
    await this.userRepository.delete(userId)
  }

 
}


