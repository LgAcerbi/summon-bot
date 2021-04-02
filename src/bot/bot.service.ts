import { Inject, Injectable } from '@nestjs/common';
import { RiotService } from '../riot/riot.service'
import { MessageService } from './message.service'
import { FindBySummonerNameDto } from 'src/riot/dto/findBySummonerName.dto';
import { EmbedMessageDto } from './dto/embedMessage.dto'
import { FindEloBySummonerIdDto } from 'src/riot/dto/findEloBySummonerId.dto';
import { FindMasteriesBySummonerIdDto } from 'src/riot/dto/findMasteriesBySummonerId';

@Injectable()
export class BotService {
    constructor(
        private riotService: RiotService,
        private messageService: MessageService,
    )
    {}
    async getSummonerData(summonerName: String): Promise<any>{
        const baseData = await this.findBySummonerName(summonerName);
        const promises = [
            this.findEloBySummonerId(baseData.id),
            this.findMasteriesBySummonerId(baseData.id),
            this.findScoreBySummonerId(baseData.id),
        ]
        const championsData = await this.getAllChampionsData()
        const userData = this.fetchUserData(await Promise.all<any>(promises), baseData);
        return this.messageService.getMessage(userData, championsData);
    }

    async findBySummonerName(summonerName: String): Promise<FindBySummonerNameDto>{
        return this.riotService.findUserBySummonerName(summonerName);
    }

    async findEloBySummonerId(id: String): Promise<FindEloBySummonerIdDto[]>{
        return this.riotService.findEloBySummonerId(id);
    }

    async findScoreBySummonerId(id: String): Promise<Number>{
        return this.riotService.findScoreBySummonerId(id);
    }

    async findMasteriesBySummonerId(id: String): Promise<FindMasteriesBySummonerIdDto[]>{
        return this.riotService.findMasteriesBySummonerId(id);
    }

    async getAllChampionsData(): Promise<Object>{
        return this.riotService.getAllChampionsData();
    }

    fetchUserData(extraData: any[], baseData: FindBySummonerNameDto) : any{    // Mudar para formattedEloDto
        return {
            ...baseData,
            elo: extraData[0],
            masteries: extraData[1],
            score: extraData[2]
        }
    }
}