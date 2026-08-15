import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gym } from './entity/gym.entity';
import { CreateGymDto, UpdateGymDto } from './dto/createUpdate.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class GymService {
    constructor(
        @InjectRepository(Gym)
        private gymRepository: Repository<Gym>
    ){}

    findAll(): Promise<Gym[]>{
        return this.gymRepository.find();
    }

    findOne(id: number): Promise<Gym>{
        return this.gymRepository.findOneBy({id: Number(id)});
    }
    async getGymByOwner(ownerId: number): Promise<Gym | null> {
        const gym = await this.gymRepository.findOne({
            where: { ownerId },
        });
        // Return null if no gym is found (don't throw error)
        return gym;
    }
    
    
    async create(createGymDto: CreateGymDto, ownerId:number):Promise<Gym>{
        const gym=this.gymRepository.create({...createGymDto,ownerId});
        return this.gymRepository.save(gym)
    }
    // here the id is for the gym to be updated and the ownerId is for the owner updating the gym
    async update(id: number, ownerId:number, updateGymDto: UpdateGymDto): Promise<Gym>{
            const gym=await this.findOne(id);
            if (!gym){
                throw new NotFoundError('Gym not found')
            }
            if (ownerId!==gym.ownerId){
                throw new Error('You do not have permission to update this gym');
            }
            Object.assign(gym, updateGymDto)
            return this.gymRepository.save(gym)
    }
    async remove(id: number,ownerId: number): Promise<void>{
        const gym = await this.findOne(id);
        if (!gym) {
            throw new Error('Gym not found');
        }
        if (gym.ownerId !== ownerId) {
            throw new Error('You do not have permission to delete this gym');
        }
        await this.gymRepository.delete(id);
    }
    // async addImagePath(id: number, filename: string){
    //     console.log(id)
    //     console.log(filename)
    //     const gym=await this.findOne(id)
    //     if (!gym){
    //         throw new NotFoundError('Gym not found')
    //     }
    //     gym.images=[`./images/gymProfiles/${filename}`]
    //     return this.gymRepository.save(gym)
    // }

    
    async addImageToGym(id: number, imagePath: string):Promise<Gym>{
        const gym=await this.findOne(id);
        if (!gym){
            throw new Error('Gym not found')
        }
        
        // Handle null, undefined, or empty array cases
        if (!gym.images || gym.images.length === 0) {
            gym.images = [imagePath];
        } else {
            // Check if image already exists to avoid duplicates
            if (!gym.images.includes(imagePath)) {
                gym.images = [...gym.images, imagePath];
            }
        }
        
        console.log(`Adding image to gym ${id}: ${imagePath}`);
        console.log(`Gym ${id} now has ${gym.images.length} image(s):`, gym.images);

        // Save the updated gym entity
        const savedGym = await this.gymRepository.save(gym);
        console.log(`Gym ${id} saved with images:`, savedGym.images);
        return savedGym;
    }

}
