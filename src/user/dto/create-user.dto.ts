import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
  @Length(8, 255)
  @IsNotEmpty()
  password: string;
}
