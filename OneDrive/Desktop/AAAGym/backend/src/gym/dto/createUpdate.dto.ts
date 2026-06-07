// import { IsString, IsOptional, IsArray } from 'class-validator';
// export class CreateGymDto{
//     @IsString()
//     name: string;
//     description: string;
//     services: {title: string, description: string}[];
//     pricingPlans: {name:string; price: string; detail: string}[];
//     FAQs: {question:string; answer: string}[];
//     @IsOptional()
//     @IsArray()
//     images: string[];

// }

// export class UpdateGymDto{
//     name?: string;
//     description?: string;
//     services?: {title: string, description: string}[];
//     pricingPlans?: {name:string, price: string, detail: string}[];
//     FAQs?: {question:string, answer: string}[];
//     images?: string[];



// }

import { IsString, IsOptional, IsArray, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

// Define nested DTOs for better structure and validation
class ServiceDto {
    @IsString()
    title: string;

    @IsString()
    description: string;
}

class PricingPlanDto {
    @IsString()
    name: string;

    @IsString()
    price: string;

    @IsString()
    detail: string;
}

class FAQDto {
    @IsString()
    question: string;

    @IsString()
    answer: string;
}

export class CreateGymDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ServiceDto)
    services: ServiceDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PricingPlanDto)
    pricingPlans: PricingPlanDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FAQDto)
    FAQs: FAQDto[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true }) // Ensures all elements are strings
    images: string[];
}

export class UpdateGymDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ServiceDto)
    services?: ServiceDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PricingPlanDto)
    pricingPlans?: PricingPlanDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FAQDto)
    FAQs?: FAQDto[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    images?: string[];
}
