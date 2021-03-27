import {
  Client,
  Content,
  Context,
  DiscordClientProvider,
  ClientProvider,
  On,
  OnCommand,
  TransformPipe,
  UsePipes,
  UseGuards,
  Once,
  ValidationPipe,
} from 'discord-nestjs';
import { Message, MessageEmbed } from 'discord.js';
import { Controller, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { BotService } from './bot.service';
import { RiotService } from 'src/riot/riot.service';


@Controller('bot')
export class BotController {
  private readonly logger = new Logger(BotController.name);

  constructor(
    private configService: ConfigService,
    private botService: BotService
    ){}

  @Client()
    discordProvider: ClientProvider;

  @Once({ event: 'ready' })
    onReady(): void {
      this.logger.log(`Logged in as ${this.discordProvider.getClient().user.tag}!`);
    }   
     
  @OnCommand({ name: 'user' })
    async onCommand(@Content() content: string, @Context() [context]: [Message]): Promise<void> {
      //console.log(content);
      //console.log(context);
      const embed = await this.botService.getSummonerData(content);
      await context.reply(embed);
    }
}
