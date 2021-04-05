import { Injectable } from '@nestjs/common';
import { RiotService } from '../riot/riot.service';
import { MessageService } from './message.service';
import { FindBySummonerNameDto } from 'src/riot/dto/findBySummonerName.dto';
import { FindEloBySummonerIdDto } from 'src/riot/dto/findEloBySummonerId.dto';
import { FindMasteriesBySummonerIdDto } from 'src/riot/dto/findMasteriesBySummonerId';
import { FetchedUserDataDto } from './dto/fetchedUser.dto';

@Injectable()
export class BotService {
  constructor(
    private riotService: RiotService,
    private messageService: MessageService,
  ) {}
  async getSummonerData(summonerName: string): Promise<any> {
    const baseData = await this.findBySummonerName(summonerName);
    const promises = [
      this.findEloBySummonerId(baseData.id),
      this.findMasteriesBySummonerId(baseData.id),
      this.findScoreBySummonerId(baseData.id),
    ];
    const championsData = await this.getAllChampionsData();
    const userData = this.fetchUserData(
      await Promise.all<any>(promises),
      baseData,
    );
    return this.messageService.getMessage(userData, championsData);
  }

  async findBySummonerName(
    summonerName: string,
  ): Promise<FindBySummonerNameDto> {
    return this.riotService.findUserBySummonerName(summonerName);
  }

  async findEloBySummonerId(id: string): Promise<FindEloBySummonerIdDto[]> {
    return this.riotService.findEloBySummonerId(id);
  }

  async findScoreBySummonerId(id: string): Promise<number> {
    return this.riotService.findScoreBySummonerId(id);
  }

  async findMasteriesBySummonerId(
    id: string,
  ): Promise<FindMasteriesBySummonerIdDto[]> {
    return this.riotService.findMasteriesBySummonerId(id);
  }

  async getAllChampionsData(): Promise<any> {
    return this.riotService.getAllChampionsData();
  }

  fetchUserData(
    extraData: any[],
    baseData: FindBySummonerNameDto,
  ): FetchedUserDataDto {
    return {
      ...baseData,
      elo: extraData[0],
      masteries: extraData[1],
      score: extraData[2],
    };
  }
}
