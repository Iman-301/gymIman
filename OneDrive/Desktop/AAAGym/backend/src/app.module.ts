
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './auth/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { GymModule } from './gym/gym.module';
import { Gym } from './gym/entity/gym.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      entities: [User,Gym],
      synchronize: process.env.NODE_ENV !== 'production', // Disable in production
    }),
    AuthModule,
    GymModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

