import { IsNotEmpty, IsString, Length } from 'class-validator';

export class BancoDto {
    @IsNotEmpty({ message: 'El código SWIFT del banco es requerido' })
    @IsString({ message: 'El código SWIFT debe ser una cadena de texto' })
    @Length(11, 11, { message: 'El código SWIFT debe tener 11 caracteres' })
    swiftBanco: string;

    @IsNotEmpty({ message: 'El nombre del banco es requerido' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @Length(1, 100, { message: 'El nombre no debe exceder 100 caracteres' })
    nombre: string;

    @IsNotEmpty({ message: 'El país del banco es requerido' })
    @IsString({ message: 'El país debe ser una cadena de texto' })
    @Length(2, 2, { message: 'El código de país debe tener 2 caracteres' })
    pais: string;

    @IsNotEmpty({ message: 'El código BIN del banco es requerido' })
    @IsString({ message: 'El código BIN debe ser una cadena de texto' })
    @Length(10, 10, { message: 'El código BIN debe tener 10 caracteres' })
    bin: string;
} 