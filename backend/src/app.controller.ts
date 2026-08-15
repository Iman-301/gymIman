import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { AppService } from './app.service';

class ContactDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  subject: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  message: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { name: string; status: string } {
    return { name: 'AAAGym API', status: 'ok' };
  }

  @Get('health')
  health(): { ok: boolean } {
    return { ok: true };
  }

  @Post('contact')
  contact(@Body() body: ContactDto) {
    console.log('Contact message', {
      name: body.name,
      email: body.email,
      subject: body.subject,
    });
    return {
      ok: true,
      message: 'Message received. An owner will get back to you.',
    };
  }
}
