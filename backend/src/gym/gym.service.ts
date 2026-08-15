import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGymDto, UpdateGymDto } from './dto/createUpdate.dto';
import { Gym } from './entity/gym.entity';

@Injectable()
export class GymService {
  constructor(
    @InjectRepository(Gym)
    private gymRepository: Repository<Gym>,
  ) {}

  async findAll(q?: string, city?: string): Promise<Gym[]> {
    const query = this.gymRepository.createQueryBuilder('gym');
    if (q?.trim()) {
      query.andWhere(
        '(gym.name LIKE :q OR gym.description LIKE :q OR gym.city LIKE :q OR gym.location LIKE :q)',
        { q: `%${q.trim()}%` },
      );
    }
    if (city?.trim()) {
      query.andWhere('gym.city LIKE :city', { city: `%${city.trim()}%` });
    }
    query.orderBy('gym.id', 'DESC');
    return query.getMany();
  }

  async findOne(id: number): Promise<Gym> {
    const gym = await this.gymRepository.findOneBy({ id: Number(id) });
    if (!gym) {
      throw new NotFoundException('Gym not found');
    }
    return gym;
  }

  async getGymByOwner(ownerId: number): Promise<Gym | null> {
    return this.gymRepository.findOne({ where: { ownerId } });
  }

  async getGymByOwnerOrFail(ownerId: number): Promise<Gym> {
    const gym = await this.getGymByOwner(ownerId);
    if (!gym) {
      throw new NotFoundException('No gym found for this owner');
    }
    return gym;
  }

  async assertOwner(gymId: number, ownerId: number): Promise<Gym> {
    const gym = await this.findOne(gymId);
    if (gym.ownerId !== ownerId) {
      throw new ForbiddenException('You do not own this gym');
    }
    return gym;
  }

  create(createGymDto: CreateGymDto, ownerId: number): Promise<Gym> {
    const gym = this.gymRepository.create({
      ...createGymDto,
      ownerId,
      images: createGymDto.images || [],
    });
    return this.gymRepository.save(gym);
  }

  async update(
    id: number,
    ownerId: number,
    updateGymDto: UpdateGymDto,
  ): Promise<Gym> {
    const gym = await this.assertOwner(id, ownerId);
    Object.assign(gym, updateGymDto);
    return this.gymRepository.save(gym);
  }

  async remove(id: number, ownerId: number): Promise<void> {
    await this.assertOwner(id, ownerId);
    await this.gymRepository.delete(id);
  }

  async addImageToGym(id: number, imagePath: string): Promise<Gym> {
    const gym = await this.findOne(id);
    const images = Array.isArray(gym.images) ? gym.images.filter(Boolean) : [];
    if (!images.includes(imagePath)) {
      images.push(imagePath);
    }
    gym.images = images;
    return this.gymRepository.save(gym);
  }
}
