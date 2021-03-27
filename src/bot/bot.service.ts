import { Inject, Injectable } from '@nestjs/common';
import { RiotService } from '../riot/riot.service'
import { FindBySummonerNameDto } from 'src/riot/dto/findBySummonerName.dto';
import { EmbedMessageDto } from './dto/embedMessage.dto'
import { MessageEmbed } from 'discord.js';
import { FindEloBySummonerIdDto } from 'src/riot/dto/findEloBySummonerId.dto';

@Injectable()
export class BotService {
    constructor(
        private riotService: RiotService,
    )
    {}
    async getSummonerData(summonerName: String): Promise<any>{
        const baseUserData = await this.findBySummonerName(summonerName);
        const eloData = await this.formatEloData(await this.findEloBySummonerId(baseUserData.id));
        return this.formatEmbedMessage(this.fetchUserData(baseUserData, eloData));
    }

    async findBySummonerName(summonerName: String): Promise<FindBySummonerNameDto>{
        return this.riotService.findUserBySummonerName(summonerName);
    }

    async findEloBySummonerId(id: String): Promise<FindEloBySummonerIdDto[]>{
        return this.riotService.findEloBySummonerId(id);
    }

    fetchUserData(baseUserData: FindBySummonerNameDto, eloData: Object){    // Mudar para formattedEloDto
        return {...baseUserData, ...eloData};
    }

    formatEmbedMessage(fetchedUser): EmbedMessageDto{
        console.log(fetchedUser);
        const embedMessage = new MessageEmbed().setColor('#0099ff')
        .setTitle(fetchedUser.name)
        .setDescription('Server: [BR]')
        .setThumbnail('https://i.imgur.com/wSTFkRM.png')
        .addFields(
            { name: 'Level', value: fetchedUser.summonerLevel, inline: true },
            { name: 'Mastery', value: '950', inline: true },
            { name: '\u200B', value: '\u200B' },
            { name: 'Solo/Duo', value: `${fetchedUser.solo.tier} ${fetchedUser.solo.rank}`, inline: true },
            { name: 'Flex', value: `${fetchedUser.flex.tier} ${fetchedUser.flex.rank}`, inline: true }
        )
        return embedMessage;
    }

    formatEloData(eloData) {
        const defaultElo = {tier: 'UNRANKED', rank: '', wins: 0, losses: 0 }
        const soloElo = eloData.find(elo => elo.queueType === 'RANKED_SOLO_5x5');
        const flexElo = eloData.find(elo => elo.queueType === 'RANKED_FLEX_SR');
        const formattedElo = {
            solo: soloElo === undefined ? defaultElo : soloElo,
            flex: flexElo === undefined ? defaultElo : flexElo,
        }
        return formattedElo;
    }
}
/*
fields: [level, maestria
        quebra de linha
        soloduo, flex]
*/

/* 
const formattedMessage = new MessageEmbed();
      formattedMessage.setColor('#0099ff')
      .setTitle('NoUnknown')
      .setURL('https://discord.js.org/')
      //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
      .setDescription('Some description here')
      .setThumbnail('https://i.imgur.com/wSTFkRM.png')
      .addFields(
        { name: 'Level', value: '51' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true },
*/