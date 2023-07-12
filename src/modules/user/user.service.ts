import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailAlreadyRegisteredError, UsernameAlreadyRegisteredError } from './_errors';
import { UserEntity } from './entities/user.entity';
import { PrismaUserRepository } from './repositories';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {

  constructor(
    private readonly prismaService: PrismaService,
  ){}

  async create(createUserDto: CreateUserDto) {

    return await this.prismaService.$transaction(async (prisma: PrismaClient) => {
      const prismaUserRepository = new PrismaUserRepository(prisma)
      
      const existingEmail = await prismaUserRepository.findByEmail(createUserDto.email)
      if(existingEmail) throw new EmailAlreadyRegisteredError()
      
      const existingUsername = await prismaUserRepository.findByUsername(createUserDto.username)
      if(existingUsername) throw new UsernameAlreadyRegisteredError()
      
      const userEntity = new UserEntity({
        ...createUserDto
      })
      await userEntity.encryptPassword(createUserDto.password)
  
      await prismaUserRepository.create(userEntity)
  
      return {id: userEntity.id};
    })

  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
