import { Injectable, HttpService } from '@nestjs/common';
import { FindBySummonerNameDto } from './dto/findBySummonerName.dto';
import { FindEloBySummonerIdDto } from './dto/findEloBySummonerId.dto';
import { FindMasteriesBySummonerIdDto } from './dto/findMasteriesBySummonerId';

@Injectable()
export class RiotService {
  constructor(private httpService: HttpService) {
    httpService.axiosRef.interceptors.request.use(function (config) {
      config.headers = { 'X-Riot-Token': process.env.RIOT_TOKEN };
      return config;
    });
  }
  async findUserBySummonerName(
    summonerName: string,
  ): Promise<FindBySummonerNameDto> {
    const response = await this.httpService
      .get(
        `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
      )
      .toPromise()
      .catch((err) => {
        throw new Error(err.message);
      });
    return response.data;
  }

  async findEloBySummonerId(id: string): Promise<FindEloBySummonerIdDto[]> {
    const response = await this.httpService
      .get(
        `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`,
      )
      .toPromise()
      .catch((err) => {
        throw new Error(err.message);
      });
    return response.data;
  }

  async findMasteriesBySummonerId(
    id: string,
  ): Promise<FindMasteriesBySummonerIdDto[]> {
    const response = await this.httpService
      .get(
        `https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`,
      )
      .toPromise()
      .catch((err) => {
        throw new Error(err.message);
      });
    return response.data;
  }

  async findScoreBySummonerId(id: string): Promise<any> {
    const response = await this.httpService
      .get(
        `https://br1.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/${id}`,
      )
      .toPromise()
      .catch((err) => {
        throw new Error(err.message);
      });
    return response.data;
  }

  async findHistoryBySummonerId(id: string): Promise<any> {
    const response = await this.httpService
      .get(
        `https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`,
      )
      .toPromise()
      .catch((err) => {
        throw new Error(err.message);
      });
    return response.data;
  }

  async getAllChampionsData(): Promise<any> {
    const response = await this.httpService
      .get(
        `http://ddragon.leagueoflegends.com/cdn/11.7.1/data/en_US/champion.json`,
      )
      .toPromise()
      .catch((err) => {
        throw new Error(err.message);
      });
    return response.data;
  }
}
