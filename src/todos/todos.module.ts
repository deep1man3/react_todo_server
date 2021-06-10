import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Todo } from './todos.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [TodosService],
  controllers: [TodosController],
  imports: [SequelizeModule.forFeature([User, Todo]), AuthModule],
})
export class TodosModule {}
