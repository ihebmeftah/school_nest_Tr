import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createAccount(
    @Body() createdUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    return this.userService.createAccount(createdUserDto);
  }

  @Post('connect')
  async connectToAccount(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<UserEntity> {
    return this.userService.connectToAccount(loginUserDto);
  }
}
