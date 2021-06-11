import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodosService } from './todos.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Todo } from './todos.model';
import { CurrentUser } from '../users/current-user.decorator';
import { User } from 'src/users/users.model';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiTags('Задачи')
@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @ApiOperation({ summary: 'Создать задачу' })
  @ApiResponse({ status: 200, type: [Todo] })
  @UseGuards(JwtAuthGuard)
  @Post()
  createTodo(@CurrentUser() user: User, @Body() dto: CreateTodoDto) {
    return this.todoService.create({ ...dto, userId: user.id });
  }

  @ApiOperation({ summary: 'Получить все задачи' })
  @ApiResponse({ status: 200, type: [Todo] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTodo(@CurrentUser() user: User) {
    return this.todoService.getAllTodoByUserId(user.id);
  }

  @ApiOperation({ summary: 'Получить задачу по уникальному идентификатору' })
  @ApiResponse({ status: 200, type: [Todo] })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getTodoById(@CurrentUser() user: User, @Param('id') id: number) {
    return this.todoService.getTodoById(user.id, id);
  }

  @ApiOperation({ summary: 'Удалить задачу по уникальному идентификатору' })
  @ApiResponse({ status: 200, type: [Todo] })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@CurrentUser() user: User, @Param('id') id: number) {
    return this.todoService.deleteById(user.id, id);
  }

  @ApiOperation({ summary: 'Обновить задачу по уникальному идентификатору' })
  @ApiResponse({ status: 200, type: [Todo] })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @CurrentUser() user: User,
    @Param('id') id: number,
    @Body() otd: UpdateTodoDto,
  ) {
    return this.todoService.updateById(+user.id, +id, otd);
  }
}
