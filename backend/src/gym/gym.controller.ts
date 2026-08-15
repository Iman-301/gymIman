import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { CreateGymDto, UpdateGymDto } from './dto/createUpdate.dto';
import { Gym } from './entity/gym.entity';
import { GymService } from './gym.service';

const uploadDir = join(process.cwd(), 'uploads', 'gym-images');

function ensureUploadDir() {
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }
}

@Controller('gym')
export class GymController {
  constructor(private readonly gymService: GymService) {}

  @Get()
  findAll(@Query('q') q?: string, @Query('city') city?: string): Promise<Gym[]> {
    return this.gymService.findAll(q, city);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('my-gym')
  getGymByOwner(@Req() req: any): Promise<Gym> {
    return this.gymService.getGymByOwnerOrFail(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Gym> {
    return this.gymService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('gym_owner')
  @Post('create')
  create(@Body() createGymDto: CreateGymDto, @Req() req: any): Promise<Gym> {
    return this.gymService.create(createGymDto, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('gym_owner')
  @Post('upload-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, callback) => {
          ensureUploadDir();
          callback(null, uploadDir);
        },
        filename: (_req, file, callback) => {
          const safe = file.originalname.replace(/[^\w.\-]+/g, '_');
          callback(null, `${Date.now()}-${safe}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, callback) => {
        const allowed = /jpeg|jpg|png|webp|gif/i.test(
          extname(file.originalname).slice(1),
        );
        if (!allowed) {
          callback(new BadRequestException('Only image files are allowed'), false);
          return;
        }
        callback(null, true);
      },
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
    @Body() body?: { gymId?: string },
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const ownerId = req.user.id;
    const gymIdParam = body?.gymId ? parseInt(body.gymId, 10) : NaN;
    const gym = Number.isFinite(gymIdParam)
      ? await this.gymService.assertOwner(gymIdParam, ownerId)
      : await this.gymService.getGymByOwnerOrFail(ownerId);

    const imagePath = `./images/gymImages/${file.filename}`;
    const updatedGym = await this.gymService.addImageToGym(gym.id, imagePath);
    return {
      message: 'Image uploaded successfully',
      gymId: gym.id,
      images: updatedGym.images,
    };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('gym_owner')
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateGymDto: UpdateGymDto,
    @Req() req: any,
  ): Promise<Gym> {
    return this.gymService.update(+id, req.user.id, updateGymDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('gym_owner')
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any): Promise<void> {
    return this.gymService.remove(+id, req.user.id);
  }
}
