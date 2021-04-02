import { IsNotEmpty } from 'class-validator'  

export class FindMasteriesBySummonerIdDto {
    @IsNotEmpty()
    championId: number

    @IsNotEmpty()
    championLevel: number

    @IsNotEmpty()
    championPoints: number
}

