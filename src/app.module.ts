import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
          synchronize: configServ.get<boolean>('SYNC'),
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
