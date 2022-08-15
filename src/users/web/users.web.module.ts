import { Module } from '@nestjs/common';
import { UsersModule } from '../application/users.module';
import { UsersController } from './users.controller';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [UsersController],
})
export class UsersWebModule {}
