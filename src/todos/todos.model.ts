import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { ApiProperty } from '@nestjs/swagger';

interface TodoCreationAttribute {
  title: string;
  completed: boolean;
  userId: number;
}

@Table({ tableName: 'todos' })
export class Todo extends Model<Todo, TodoCreationAttribute> {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор задачи',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({
    example: 'Создать API для react todo app',
    description: 'Названия задачи',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: false,
    description: 'Статус задачи',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  completed: boolean;

  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор пользователя',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User[];
}
