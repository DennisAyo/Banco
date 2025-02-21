import { Injectable } from '@nestjs/common';
import { Banco } from '../entities/banco.entity';
import { NotFoundException } from '../common/exceptions/not-found.exception';
import { BancoDto } from '../dtos/banco.dto';
import { BancoRepository } from '../repositories/banco.repository';

@Injectable()
export class BancoService {
    private readonly ENTITY_NAME = 'Banco';

    constructor(
        private readonly repositorio: BancoRepository
    ) {}

    async buscarTodos(): Promise<Banco[]> {
        return await this.repositorio.find();
    }

    async buscarPorSwift(swiftBanco: string): Promise<Banco> {
        const banco = await this.repositorio.buscarPorSwift(swiftBanco);
        if (!banco) {
            throw new NotFoundException(swiftBanco, this.ENTITY_NAME);
        }
        return banco;
    }

    async buscarPorBin(bin: string): Promise<Banco> {
        const banco = await this.repositorio.buscarPorBin(bin);
        if (!banco) {
            throw new NotFoundException(bin, this.ENTITY_NAME);
        }
        return banco;
    }

    async crear(bancoDto: BancoDto): Promise<Banco> {
        const banco = this.repositorio.create(bancoDto);
        return await this.repositorio.save(banco);
    }

    async actualizar(swiftBanco: string, bancoDto: BancoDto): Promise<Banco> {
        const bancoDB = await this.buscarPorSwift(swiftBanco);
        Object.assign(bancoDB, bancoDto);
        return await this.repositorio.save(bancoDB);
    }

    async eliminar(swiftBanco: string): Promise<void> {
        const banco = await this.buscarPorSwift(swiftBanco);
        await this.repositorio.remove(banco);
    }
} 