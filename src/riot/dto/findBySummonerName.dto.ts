import { IsNotEmpty, Min, IsIn } from 'class-validator'  

export class FindBySummonerNameDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    summonerLevel: number

    @IsNotEmpty()
    id: string

    @IsNotEmpty()
    accountId: string

    @IsNotEmpty()
    profileIconId: string
}
