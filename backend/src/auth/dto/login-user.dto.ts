import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
export class LoginUserDto{
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
}