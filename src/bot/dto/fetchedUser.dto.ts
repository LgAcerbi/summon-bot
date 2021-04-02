import { IsNotEmpty, MinLength } from 'class-validator'  
import { FindEloBySummonerIdDto } from 'src/riot/dto/findEloBySummonerId.dto'
import { FindMasteriesBySummonerIdDto } from 'src/riot/dto/findMasteriesBySummonerId'

export class FetchedUserDataDto {
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

  @IsNotEmpty()
  elo: FindEloBySummonerIdDto

  @IsNotEmpty()
  @MinLength(3, {
    each: true
  })
  masteries: FindMasteriesBySummonerIdDto[]

  @IsNotEmpty()
  score: number
}
