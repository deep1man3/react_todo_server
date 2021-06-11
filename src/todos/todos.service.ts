import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todos.model';
import { Repository } from 'sequelize-typescript';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo) private todoRepository: Repository<Todo>) {}

  async create(dto: CreateTodoDto) {
    return await this.todoRepository.create(dto);
  }

  async getAllTodoByUserId(userId: number) {
    const todos = await this.todoRepository.findAll({ where: { userId } });
    if (!todos) {
      throw new HttpException(
        {
          message: 'Не удалось найти список задач, возможно он пуст',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return todos;
  }

  async getTodoById(userId: number, id: number) {
    const todo = await this.todoRepository.findOne({ where: { userId, id } });
    if (!todo) {
      throw new HttpException(
        {
          message: 'Не удалось найти задачу с таким уникальным идентификатором',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return todo;
  }

  async deleteById(userId: number, id: number) {
    const todo = await this.todoRepository.findOne({ where: { userId, id } });
    if (!todo) {
      throw new HttpException(
        { message: 'Некорректный уникальный идентификатор задачи' },
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.todoRepository.destroy({ where: { id } });
    return {
      message: `Задача под номером ${id} была удаленна`,
    };
  }

  async updateById(userId: number, id: number, dto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOne({ where: { userId, id } });
    if (!todo) {
      throw new HttpException(
        { message: 'Некорректный уникальный идентификатор задачи' },
        HttpStatus.BAD_REQUEST,
      );
    }
    todo.title = dto.title;
    todo.completed = dto.completed;
    await todo.save();
    return todo;
  }
}
