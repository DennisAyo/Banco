import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Banco } from './entities/banco.entity';
import { BancoService } from './services/banco.service';
import { BancoController } from './controllers/banco.controller';
import { BancoRepository } from './repositories/banco.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'banco_tarjeta',
      entities: [Banco],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Banco]),
  ],
  controllers: [AppController, BancoController],
  providers: [AppService, BancoService, BancoRepository],
})
export class AppModule {}
