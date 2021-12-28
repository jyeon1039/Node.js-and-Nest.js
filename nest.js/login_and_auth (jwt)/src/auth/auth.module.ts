import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule, 
            PassportModule,
            JwtModule.register({
              secret: jwtConstants.secret,
              signOptions: {expiresIn: '60s'},
            })
            ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService] // 다른 곳에서 사용하려면 꼭 넣어주어야 함
})
export class AuthModule {}
