import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'USER',
    description: 'Значение роли пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly value: string;
  @ApiProperty({
    example: 'Пользователь',
    description: 'Описание роли пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly description: string;
}
