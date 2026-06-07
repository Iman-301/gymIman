import {Get, Post,Put,Delete,Param,Body, Controller, UseGuards, Req, UseInterceptors,UploadedFile, Patch, BadRequestException } from '@nestjs/common';
import { GymService } from './gym.service';
import { Gym } from './entity/gym.entity';
import { CreateGymDto, UpdateGymDto } from './dto/createUpdate.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('gym')
export class GymController {
    constructor(private readonly gymService: GymService){}
   
    @Get()
    findAll():Promise<Gym[]>{
        return this.gymService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string):Promise<Gym>{
        return this.gymService.findOne(+id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/my-gym')
    async getGymByOwner(@Req() req: any): Promise<Gym | null> {
        const ownerId = req.user.id; // Extract owner ID from JWT payload
        const gym = await this.gymService.getGymByOwner(ownerId);
        if (!gym) {
            throw new BadRequestException('No gym found for this owner');
        }
        return gym;
    }
    
    
    
    
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('gym_owner')
    @Post('/create')
    async create(
        @Body() createGymDto: CreateGymDto,
        @Req() req: any, // Access the user from the request
    ):Promise<Gym>{
       try{
        const ownerId = req.user.id; 
        const gym=await this.gymService.create(createGymDto,ownerId)
        console.log('CreateGymDto:', createGymDto);

        return gym
       }
       catch (error) {
        console.error('Error creating gym:', error);
        throw new BadRequestException('Failed to create gym');
    }
    }
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('gym_owner')
    @Post('/upload-image')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: 'src/images/gymImages',
                filename: (req, file, callback) => {
                    const filename = `${Date.now()}-${file.originalname}`;
                    callback(null, filename);
                },
            }),
        })
    )
    async uploadImage(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: any,
        @Body() body?: any, // For multipart/form-data
    ): Promise<any> {
        const ownerId = req.user.id; // Get ownerId from the authenticated user
        let gym;
        
        // Get gymId from body (FormData) or query parameter
        const gymIdFromBody = body?.gymId ? parseInt(body.gymId, 10) : null;
        const gymIdFromQuery = req.query?.gymId ? parseInt(req.query.gymId, 10) : null;
        const gymIdParam = gymIdFromBody || gymIdFromQuery;
        
        // If gymId is provided, use that gym (and verify ownership)
        if (gymIdParam && !isNaN(gymIdParam)) {
            gym = await this.gymService.findOne(gymIdParam);
            if (!gym) {
                throw new BadRequestException('Gym not found.');
            }
            if (gym.ownerId !== ownerId) {
                throw new BadRequestException('You do not have permission to upload images to this gym.');
            }
            console.log(`Uploading image to specific gym ID: ${gymIdParam}`);
        } else {
            // Fallback: get gym by owner (for backward compatibility)
            gym = await this.gymService.getGymByOwner(ownerId);
            if (!gym) {
                throw new BadRequestException('Gym not found for this owner. Please create a gym first.');
            }
            console.log(`Uploading image to owner's gym (fallback): ${gym.id}`);
        }
        
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }
    
        const imagePath = `./images/gymImages/${file.filename}`;

        const updatedGym = await this.gymService.addImageToGym(gym.id, imagePath); // Append the image to the gym's list
        return { message: 'Image uploaded successfully', gymId: gym.id, images: updatedGym.images};
    }
    

    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles('gym_owner')
    @Patch('/update/:id')
    @UseInterceptors(
        FileInterceptor('file',{
            storage: diskStorage({
                destination:'src/images/gymImages',
                filename: (req,file,callback)=>{
                    const filename= `${file.originalname}`;
                    callback(null,filename)
                }
                
            })
        })
    )





    
    async update(
        @Param('id') id: string,
        @Body() updateGymDto: UpdateGymDto,
        @UploadedFile() file: Express.Multer.File,
        @Req() req: any,
    ):Promise<Gym>{
        const ownerId = req.user.id; // Ensure the request is from the owner
        const gym = await this.gymService.getGymByOwner(ownerId);
        if (!gym) {
            throw new BadRequestException('Gym not found for this owner');
        }
    
        // Add new image if uploaded
        const imagePath = file ? `./images/gymImages/${file.filename}` : null;
        if (imagePath) {
            updateGymDto.images = gym.images
                ? [...gym.images, imagePath] // Append new image
                : [imagePath]; // Initialize if no images exist
        }
    
        return this.gymService.update(+id, ownerId, updateGymDto);
    }



    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('gym_owner')
    @Delete(':id')
        remove(@Param('id') id: string, @Req() req: any):Promise<void>{
            const ownerId = req.user.id;
            return this.gymService.remove(+id,ownerId);
        }
    
}