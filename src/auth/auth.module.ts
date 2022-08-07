import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from '../users/users.repository';
import { UsersModule } from '../users/users.module';
import { TypeOrmExModule } from '../db/typeorm-ex.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import config from 'config';
import { JwtStrategy } from './jwt.strategy';

const jwtConfig = config.get<JwtConfig>('jwt');

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret, // jwt 생성 시 사용하는 secret 텍스트
      signOptions: {
        expiresIn: jwtConfig.expiresIn, // default: 30 minutes
      },
    }),
    // TypeOrmExModule.forCustomRepository([UsersRepository]),
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
