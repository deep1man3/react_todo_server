import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'Имя пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly firstname: string;

  @ApiProperty({
    example: 'Wick',
    description: 'Фамилия пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly lastname: string;

  @ApiProperty({
    example: 'mail@mail.ru',
    description: 'Почтовый адрес пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный E-mail' })
  readonly email: string;

  @ApiProperty({
    example: '1q2w3e4r',
    description: 'Пароль от учетной записи пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, {
    message: 'Длинна пароля не может быть меньше 4 и больше 16 символов',
  })
  readonly password: string;
}
