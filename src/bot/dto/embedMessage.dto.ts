import { IsNotEmpty, MinLength } from 'class-validator'  

export class EmbedMessageDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    image: Object

    @IsNotEmpty()
    color: number

    @MinLength(5, {
        each: true
    })
    fields: Object[];
}

/* 
fields: [level, maestria
        quebra de linha
        soloduo, flex]
*/