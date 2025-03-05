import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Banco } from './entities/banco.entity';
import { BancoService } from './services/banco.service';
import { BancoController } from './controllers/banco.controller';
import { BancoRepository } from './repositories/banco.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'ms-mariadb.ct6s2uqkmna8.us-east-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'password123',
      database: 'marca_banco',
      entities: [Banco],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Banco]),
  ],
  controllers: [AppController, BancoController],
  providers: [AppService, BancoService, BancoRepository],
})
export class AppModule {}
