import { forwardRef, Module } from '@nestjs/common';
import { AuthJwtService } from './jwt/auth-jwt.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@users/application/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import config from 'config';
import { AuthService } from './auth.service';
import { AuthLocalService } from './local/auth-local.service';
import { LocalStrategy } from './local/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@users/application/entity/user.entity';
import passport from 'passport';
import { LocalSerializer } from './local/local.serializer';

const jwtConfig = config.get<JwtConfig>('jwt');

@Module({
  imports: [
    // // JWT
    // PassportModule.register({
    //   defaultStrategy: 'jwt',
    // }),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET || jwtConfig.secret, // jwt 생성 시 사용하는 secret 텍스트
    //   signOptions: {
    //     expiresIn: jwtConfig.expiresIn, // default: 30 minutes
    //   },
    // }),

    // Local
    PassportModule.register({ defaultStrategy: 'local', session: true }),
    TypeOrmModule.forFeature([User]),
    // TypeOrmExModule.forCustomRepository([UsersRepository]),
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // AuthJwtService,
    JwtStrategy,
    AuthLocalService,
    LocalStrategy,
    LocalSerializer,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
