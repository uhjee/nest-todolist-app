import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { AuthModule } from '../../auth/auth.module';
import { UsersRDBQueryService } from './users.query.service';
import { UsersRDBCommandService } from './users.command.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UsersRepository]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService, UsersRDBQueryService, UsersRDBCommandService],
  exports: [
    UsersService,
    TypeOrmExModule.forCustomRepository([UsersRepository]),
  ],
})
export class UsersModule {}
