import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { BancoService } from '../services/banco.service';
import { BancoDto } from '../dtos/banco.dto';
import { Banco } from '../entities/banco.entity';

@Controller('api/v1/bancos')
export class BancoController {
    private readonly logger = new Logger(BancoController.name);

    constructor(private readonly servicio: BancoService) {}

    @Post()
    @HttpCode(201)
    async crear(@Body() bancoDto: BancoDto): Promise<Banco> {
        try {
            const banco = await this.servicio.crear(bancoDto);
            this.logger.log(`Se creó el banco con SWIFT: ${banco.swiftBanco}`);
            return banco;
        } catch (error) {
            this.logger.error('Error al crear el banco', error);
            throw new HttpException('Error al crear el banco', HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async obtenerTodos(): Promise<Banco[]> {
        try {
            const bancos = await this.servicio.buscarTodos();
            this.logger.log(`Se encontraron ${bancos.length} bancos`);
            return bancos;
        } catch (error) {
            this.logger.error('Error al obtener todos los bancos', error);
            throw new HttpException('Error al obtener los bancos', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':swift')
    async obtenerPorSwift(@Param('swift') swift: string): Promise<Banco> {
        try {
            const banco = await this.servicio.buscarPorSwift(swift);
            this.logger.log(`Se encontró el banco con SWIFT: ${swift}`);
            return banco;
        } catch (error) {
            this.logger.error(`No se encontró el banco con SWIFT: ${swift}`);
            throw new HttpException('Banco no encontrado', HttpStatus.NOT_FOUND);
        }
    }

    @Get('bin/:bin')
    async obtenerPorBin(@Param('bin') bin: string): Promise<Banco> {
        try {
            const banco = await this.servicio.buscarPorBin(bin);
            this.logger.log(`Se encontró el banco con BIN: ${bin}`);
            return banco;
        } catch (error) {
            this.logger.error(`No se encontró el banco con BIN: ${bin}`);
            throw new HttpException('Banco no encontrado', HttpStatus.NOT_FOUND);
        }
    }

    @Put(':swift')
    async actualizar(
        @Param('swift') swift: string,
        @Body() bancoDto: BancoDto,
    ): Promise<Banco> {
        try {
            const banco = await this.servicio.actualizar(swift, bancoDto);
            this.logger.log(`Se actualizó el banco con SWIFT: ${swift}`);
            return banco;
        } catch (error) {
            if (error.name === 'NotFoundException') {
                this.logger.error(`No se encontró el banco con SWIFT: ${swift}`);
                throw new HttpException('Banco no encontrado', HttpStatus.NOT_FOUND);
            }
            this.logger.error('Error al actualizar el banco', error);
            throw new HttpException('Error al actualizar el banco', HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':swift')
    @HttpCode(204)
    async eliminar(@Param('swift') swift: string): Promise<void> {
        try {
            await this.servicio.eliminar(swift);
            this.logger.log(`Se eliminó el banco con SWIFT: ${swift}`);
        } catch (error) {
            this.logger.error(`No se encontró el banco con SWIFT: ${swift}`);
            throw new HttpException('Banco no encontrado', HttpStatus.NOT_FOUND);
        }
    }
} 