import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createAccount(createdUserDto: CreateUserDto): Promise<UserEntity> {
    const userExistOrNo = await this.userRepository
      .createQueryBuilder('users')
      .where('users.email = :email', { email: createdUserDto.email })
      .orWhere('users.phone = :phone', { phone: createdUserDto.phone })
      .getOne();
    if (userExistOrNo) {
      throw new HttpException(
        'Email and phone number is unique',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = new UserEntity({ ...createdUserDto });
    delete user.password;
    return this.userRepository.save(user);
  }

  async connectToAccount(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email,
      },
    });
    if (!user) {
      throw new HttpException('Bad creadentials Email', HttpStatus.BAD_REQUEST);
    }
    const matchPwd = await argon2.verify(user.password, loginUserDto.password);
    if (!matchPwd) {
      throw new HttpException(
        'Bad creadentials password',
        HttpStatus.BAD_REQUEST,
      );
    }
    delete user.password;
    return user;
  }
}
