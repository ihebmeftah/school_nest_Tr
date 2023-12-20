import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configServ: ConfigService) => {
        return {
          type: 'postgres',
          host: configServ.get<string>('DB_HOST'),
          port: configServ.get<number>('DB_PORT'),
          username: configServ.get<string>('DB_USERNAME'),
          password: configServ.get<string>('DB_PASSWORD'),
          database: configServ.get<string>('DB_NAME'),
          entities: ['dist/**/*.entity{.js,.ts}'],
          migrations: ['dist/db/migrations/*{.js,.ts}'],
          synchronize: configServ.get<boolean>('DB_SYNC'),
        };
      },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
