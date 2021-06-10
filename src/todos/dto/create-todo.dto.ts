import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    example: 'Создать API для react todo app',
    description: 'Название задачи',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly title: string;
  @ApiProperty({
    example: false,
    description: 'Статус задачи',
  })
  @IsBoolean({ message: 'Должно быть строкой' })
  readonly completed: boolean;
  @ApiProperty({
    example: '1',
    description: 'Уникальный индифекатор пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly userId: number;
}
