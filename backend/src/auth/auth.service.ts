import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

type PublicUser = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private strip(user: User): PublicUser {
    const { password, ...safe } = user;
    return safe;
  }

  async create(createUserDto: CreateUserDto): Promise<PublicUser> {
    const existing = await this.userRepository.findOne({
      where: [{ email: createUserDto.email }, { username: createUserDto.username }],
    });
    if (existing) {
      throw new ConflictException('Email or username is already taken');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const saved = await this.userRepository.save(user);
    return this.strip(saved);
  }

  async validateUser(username: string, pass: string, role: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (
      user &&
      user.role === role &&
      (await bcrypt.compare(pass, user.password))
    ) {
      return this.strip(user);
    }
    return null;
  }

  login(user: PublicUser) {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }

  async publicUser(userId: number): Promise<PublicUser> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.strip(user);
  }

  async changePassword(userId: number, newPassword: string): Promise<PublicUser> {
    await this.publicUser(userId);
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await this.userRepository.update(userId, { password: hashedPassword });
    return this.publicUser(userId);
  }

  async changeEmail(userId: number, newEmail: string): Promise<PublicUser> {
    const taken = await this.userRepository.findOne({ where: { email: newEmail } });
    if (taken && taken.id !== userId) {
      throw new ConflictException('Email is already taken');
    }
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.email = newEmail;
    return this.strip(await this.userRepository.save(user));
  }

  async changeUsername(id: number, newUsername: string): Promise<PublicUser> {
    const taken = await this.userRepository.findOne({
      where: { username: newUsername },
    });
    if (taken && taken.id !== id) {
      throw new ConflictException('Username is already taken');
    }
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.username = newUsername;
    return this.strip(await this.userRepository.save(user));
  }

  async deleteAccount(userId: number): Promise<{ message: string }> {
    await this.userRepository.delete(userId);
    return { message: 'Account deleted' };
  }
}
