import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GymService } from './gym.service';
import { GymController } from './gym.controller';
import { Gym } from './entity/gym.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Gym]),
    AuthModule
],
    providers: [GymService],
    controllers: [GymController]
})
export class GymModule {}
