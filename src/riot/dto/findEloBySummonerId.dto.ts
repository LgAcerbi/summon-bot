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

/* 
summonerLevel:320
revisionDate:1615897422000
puuid:'wxTE0UovagMczGfR-jqPhWE7fAMi5plbyVKo6mcWkwDbcahUDj-A074gtmEv7FAgYna57pnufMEXlg'
profileIconId:4808
name:'Acerbi'
id:'1m0caevbzDaKxklXBpXP2syrPhigKsOVZp5HOfCLP2YIGWo'
accountId:'EfwwqGCifl5oysknGPedVZT5HQMMJqPslqAjExGEyYPHi6A'*/