import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty() 
    @IsString()  
    name: string;

    @IsNotEmpty()
    @IsEmail() 
    email: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsIn(['gym_owner', 'gym_user'])
    role: string;

    @IsOptional() 
    @IsNumber() 
    age?: number;

    @IsOptional()
    @IsString()
    gender?: string;
}