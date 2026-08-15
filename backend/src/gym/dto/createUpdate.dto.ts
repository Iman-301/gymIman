import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class ServiceDto {
  @IsString()
  @MaxLength(80)
  title: string;

  @IsString()
  @MaxLength(400)
  description: string;
}

class PricingPlanDto {
  @IsString()
  @MaxLength(80)
  name: string;

  @IsString()
  @MaxLength(80)
  price: string;

  @IsString()
  @MaxLength(400)
  detail: string;
}

class FAQDto {
  @IsString()
  @MaxLength(160)
  question: string;

  @IsString()
  @MaxLength(800)
  answer: string;
}

export class CreateGymDto {
  @IsString()
  @MaxLength(80)
  name: string;

  @IsString()
  @MaxLength(4000)
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  location?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string;

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
  @IsString({ each: true })
  images?: string[];
}

export class UpdateGymDto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4000)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  location?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string;

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
