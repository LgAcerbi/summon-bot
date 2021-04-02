import { IsNotEmpty, MinLength } from 'class-validator'  

export class EloDto {
  @IsNotEmpty()
  tier: string

  @IsNotEmpty()
  rank: string

  @IsNotEmpty()
  wins: number

  @IsNotEmpty()
  losses: number

  @IsNotEmpty()
  winrate: string

}