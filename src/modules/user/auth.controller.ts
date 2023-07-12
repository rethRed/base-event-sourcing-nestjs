import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { 
  SignupUsecase 
} from './usecases';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  @Post("/signup")
  create(@Body() createUserDto: CreateUserDto) {
    const signupUsecase = new SignupUsecase(this.prismaService)
    return signupUsecase.execute(createUserDto);
  }

}
