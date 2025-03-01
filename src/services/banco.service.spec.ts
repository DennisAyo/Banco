import { Test, TestingModule } from '@nestjs/testing';
import { BancoService } from './banco.service';
import { BancoRepository } from '../repositories/banco.repository';
import { Banco } from '../entities/banco.entity';
import { NotFoundException } from '../common/exceptions/not-found.exception';

describe('BancoService', () => {
    let service: BancoService;
    let repository: BancoRepository;

    const mockBanco: Banco = {
        swiftBanco: 'PICHECU0001',
        nombre: 'Banco Pichincha',
        pais: 'EC',
        bin: '1234567890'
    };

    const mockRepository = {
        find: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        remove: jest.fn(),
        buscarPorSwift: jest.fn(),
        buscarPorBin: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BancoService,
                {
                    provide: BancoRepository,
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<BancoService>(BancoService);
        repository = module.get<BancoRepository>(BancoRepository);
    });

    describe('buscarTodos', () => {
        it('debería retornar un array de bancos', async () => {
           
            const bancos = [mockBanco];
            mockRepository.find.mockResolvedValue(bancos);

            const resultado = await service.buscarTodos();

            expect(resultado).toEqual(bancos);
            expect(mockRepository.find).toHaveBeenCalled();
        });
    });

    describe('buscarPorSwift', () => {
        it('debería retornar un banco cuando existe', async () => {
           
            mockRepository.buscarPorSwift.mockResolvedValue(mockBanco);

            const resultado = await service.buscarPorSwift('PICHECU0001');

            expect(resultado).toEqual(mockBanco);
            expect(mockRepository.buscarPorSwift).toHaveBeenCalledWith('PICHECU0001');
        });

        it('debería lanzar NotFoundException cuando el banco no existe', async () => {
            
            mockRepository.buscarPorSwift.mockResolvedValue(null);

            await expect(service.buscarPorSwift('INVALIDSWIFT'))
                .rejects
                .toThrow(NotFoundException);
        });
    });

    describe('buscarPorBin', () => {
        it('debería retornar un banco cuando existe', async () => {
           
            mockRepository.buscarPorBin.mockResolvedValue(mockBanco);

            const resultado = await service.buscarPorBin('1234567890');

            expect(resultado).toEqual(mockBanco);
            expect(mockRepository.buscarPorBin).toHaveBeenCalledWith('1234567890');
        });

        it('debería lanzar NotFoundException cuando el BIN no existe', async () => {
           
            mockRepository.buscarPorBin.mockResolvedValue(null);

            await expect(service.buscarPorBin('0000000000'))
                .rejects
                .toThrow(NotFoundException);
        });
    });

    describe('crear', () => {
        it('debería crear un nuevo banco correctamente', async () => {
           
            const bancoDto = {
                swiftBanco: 'PICHECU0001',
                nombre: 'Banco Pichincha',
                pais: 'EC',
                bin: '1234567890'
            };
            mockRepository.create.mockReturnValue(mockBanco);
            mockRepository.save.mockResolvedValue(mockBanco);

            const resultado = await service.crear(bancoDto);

            expect(resultado).toEqual(mockBanco);
            expect(mockRepository.create).toHaveBeenCalledWith(bancoDto);
            expect(mockRepository.save).toHaveBeenCalledWith(mockBanco);
        });
    });

    describe('actualizar', () => {
        it('debería actualizar un banco existente', async () => {
           
            const bancoActualizado = { ...mockBanco, nombre: 'Banco Pichincha Actualizado' };
            const bancoDto = {
                swiftBanco: 'PICHECU0001',
                nombre: 'Banco Pichincha Actualizado',
                pais: 'EC',
                bin: '1234567890'
            };
            mockRepository.buscarPorSwift.mockResolvedValue(mockBanco);
            mockRepository.save.mockResolvedValue(bancoActualizado);

            const resultado = await service.actualizar('PICHECU0001', bancoDto);

            expect(resultado).toEqual(bancoActualizado);
            expect(mockRepository.buscarPorSwift).toHaveBeenCalledWith('PICHECU0001');
            expect(mockRepository.save).toHaveBeenCalled();
        });

        it('debería lanzar NotFoundException al actualizar un banco que no existe', async () => {
           
            const bancoDto = {
                swiftBanco: 'INVALIDSWIFT',
                nombre: 'Banco Inválido',
                pais: 'EC',
                bin: '1234567890'
            };
            mockRepository.buscarPorSwift.mockResolvedValue(null);

            await expect(service.actualizar('INVALIDSWIFT', bancoDto))
                .rejects
                .toThrow(NotFoundException);
        });
    });

    describe('eliminar', () => {
        it('debería eliminar un banco existente', async () => {
           
            mockRepository.buscarPorSwift.mockResolvedValue(mockBanco);
            mockRepository.remove.mockResolvedValue(undefined);

            await service.eliminar('PICHECU0001');

            expect(mockRepository.buscarPorSwift).toHaveBeenCalledWith('PICHECU0001');
            expect(mockRepository.remove).toHaveBeenCalledWith(mockBanco);
        });

        it('debería lanzar NotFoundException al eliminar un banco que no existe', async () => {
           
            mockRepository.buscarPorSwift.mockResolvedValue(null);

            await expect(service.eliminar('INVALIDSWIFT'))
                .rejects
                .toThrow(NotFoundException);
        });
    });
}); 