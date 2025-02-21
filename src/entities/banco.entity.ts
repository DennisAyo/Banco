import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'BANCO' })
export class Banco {
    @PrimaryColumn({ name: 'SWIFT_BANCO', length: 11 })
    swiftBanco: string;

    @Column({ name: 'NOMBRE', length: 100, nullable: false })
    nombre: string;

    @Column({ name: 'PAIS', length: 2, nullable: false })
    pais: string;

    @Column({ name: 'BIN', length: 10, nullable: false })
    bin: string;
} 