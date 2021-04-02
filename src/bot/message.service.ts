import { Injectable } from '@nestjs/common';
import { EmbedMessageDto } from './dto/embedMessage.dto';
import { EloDto } from './dto/elo.dto'
import { MessageEmbed } from 'discord.js';
import { FindMasteriesBySummonerIdDto } from 'src/riot/dto/findMasteriesBySummonerId';

@Injectable()
export class MessageService {
    getMessage(userData: any, championsData: any) : any{
        userData.elo = this.formatEloData(userData.elo);
        const championData = this.getBiggestMasteryChampion(userData.masteries, championsData)
        return this.formatEmbedMessage(userData, championData);
    }
    formatEmbedMessage(userData: any, championData): EmbedMessageDto{
        const embedMessage = new MessageEmbed().setColor('#e8342a')
        .setTitle(userData.name)
        .setDescription('Server: [BR]')
        .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/profileicon/${userData.profileIconId}.png`)
        .addFields(
            { name: 'Level', value: `:small_blue_diamond: ${userData.summonerLevel}`, inline: true },
            { name: 'Mastery', value: `:small_orange_diamond: ${userData.score} points`, inline: true },
            { name: '\u200B', value: '-----------------------------------------------------------------' },
            { name: 'Solo/Duo', value: this.getEloField(userData.elo.solo), inline: true },
            { name: 'Flex', value: this.getEloField(userData.elo.flex), inline: true },
            { name: '\u200B', value: '-----------------------------------------------------------------' },
        )
        .addField('Biggest Mastery', `Level: ${userData.masteries[0].championLevel}  -  Points: ${userData.masteries[0].championPoints}`, false)
        .setImage(`http://ddragon.leagueoflegends.com/cdn/11.7.1/img/champion/${championData.name}.png`)

        return embedMessage;
    }

    formatEloData(eloData) {
        const defaultElo = {tier: 'UNRANKED', rank: '', wins: 0, losses: 0, winrate: '' }
        const soloElo = eloData.find(elo => elo.queueType === 'RANKED_SOLO_5x5');
        const flexElo = eloData.find(elo => elo.queueType === 'RANKED_FLEX_SR');
        const formattedElo = {
            solo: soloElo === undefined ? defaultElo : soloElo,
            flex: flexElo === undefined ? defaultElo : flexElo,
        }
        formattedElo.solo.winrate = this.getWinrate(formattedElo.solo.wins, formattedElo.solo.losses);
        formattedElo.flex.winrate = this.getWinrate(formattedElo.flex.wins, formattedElo.flex.losses);
        return formattedElo;
    }

    getBiggestMasteryChampion(masteriesData: FindMasteriesBySummonerIdDto[], champions: any) {
        champions = Object.values(champions.data)
        return champions.find(champion => champion.key === masteriesData[0].championId.toString())
    }

    getWinrate(wins: number, losses: number){
        const winrate = Math.round((wins * 100) / (wins + losses))
        const formattedWinrate = isNaN(winrate) ? '' : winrate;
        return `Winrate: ${formattedWinrate}%`
    }

    getEloField(elo: EloDto){
        return `${elo.tier} ${elo.rank}     -      ${elo.wins}/${elo.losses}\n ${elo.winrate}`
    }
}
