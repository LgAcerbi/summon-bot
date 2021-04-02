import { IsNotEmpty } from 'class-validator'  

export class FindEloBySummonerIdDto {
    @IsNotEmpty()
    queueType: string

    @IsNotEmpty()
    tier: number

    @IsNotEmpty()
    rank: string

    @IsNotEmpty()
    leaguePoints: number

    @IsNotEmpty()
    wins: number

    @IsNotEmpty()
    losses: number
}
