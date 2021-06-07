import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'Имя пользователя',
  })
  readonly firstname: string;
  @ApiProperty({
    example: 'Wick',
    description: 'Фамилия пользователя',
  })
  readonly lastname: string;
  @ApiProperty({
    example: 'mail@mail.ru',
    description: 'Почтовый адрес пользователя',
  })
  readonly email: string;
  @ApiProperty({
    example: '1q2w3e4r5t6y7u8i9o',
    description: 'Пароль от учетной записи пользователя',
  })
  readonly password: string;
}
