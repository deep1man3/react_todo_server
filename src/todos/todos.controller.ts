import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodosService } from './todos.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Todo } from './todos.model';
import { CurrentUser } from '../users/current-user.decorator';
import { User } from 'src/users/users.model';

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
}
