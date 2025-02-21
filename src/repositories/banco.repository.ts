import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Banco } from '../entities/banco.entity';

@Injectable()
export class BancoRepository extends Repository<Banco> {
    constructor(private dataSource: DataSource) {
        super(Banco, dataSource.createEntityManager());
    }

    async buscarPorSwift(swiftBanco: string): Promise<Banco | null> {
        return this.findOne({ where: { swiftBanco } });
    }

    async buscarPorBin(bin: string): Promise<Banco | null> {
        return this.findOne({ where: { bin } });
    }
} 