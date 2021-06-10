import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({
    example: '1',
    description: 'Уникальный индифекатор пользователя',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly userId: number;
  @ApiProperty({
    example: 'Мультиаккаунт',
    description: 'Причина блокировки пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly banReason: string;
}
