import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  imports: [],
  providers: [
    UserService
    
  ],
  

})
export class UserModule {}
