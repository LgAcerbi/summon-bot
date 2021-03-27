import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FindBySummonerNameDto } from './dto/findBySummonerName.dto'
import { FindEloBySummonerIdDto } from './dto/findEloBySummonerId.dto';

@Injectable()
export class RiotService {
    constructor(
        private httpService: HttpService,
        private configService: ConfigService
        ) {
            httpService.axiosRef.interceptors.request.use(function (config){
                config.headers = {'X-Riot-Token': configService.get<String>('RIOT_TOKEN')};
                return config;
            })
        }
    async findUserBySummonerName(summonerName: String): Promise<FindBySummonerNameDto>{
        const response =  await this.httpService.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`)
            .toPromise();
        return response.data;
    }

    async findEloBySummonerId(id: String): Promise<FindEloBySummonerIdDto[]>{
        const response =  await this.httpService.get(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`)
            .toPromise();
        return response.data;
    }
}

//https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/