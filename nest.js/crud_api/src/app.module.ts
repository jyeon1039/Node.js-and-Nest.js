import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserModule } from './user/user.module';

// 데코레이터는 클래스에 함수 기능을 추가할 수 있음
// 앱 모듈에는 하는 거를 모두 import 해야 함
@Module({
  imports: [TypeOrmModule.forRoot({
              type: 'mysql',
              host: 'localhost',
              port: 3306,
              username: 'root',
              password: 'hlabtech0809^^',
              database: 'test',
              entities: [User],
              synchronize: true,
            }), 
            UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
