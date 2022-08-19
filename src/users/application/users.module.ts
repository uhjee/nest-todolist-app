import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthModule } from '../../auth/auth.module';
import { UsersRDBQueryService } from './users.query.service';
import { UsersRDBCommandService } from './users.command.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@users/application/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [UsersService, UsersRDBQueryService, UsersRDBCommandService],
  exports: [UsersService],
})
export class UsersModule {}
