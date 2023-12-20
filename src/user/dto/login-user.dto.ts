import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Length(8, 255)
  @IsNotEmpty()
  readonly password: string;
}
