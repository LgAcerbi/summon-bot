import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { DiscordClientProvider } from 'discord-nestjs';
import { RiotModule } from 'src/riot/riot.module';
import { DiscordService } from 'discord-nestjs/dist/core/service/discord.service';
import { DiscordModule } from 'discord-nestjs'
import { ConfigModule } from '@nestjs/config';
import { BotService } from './bot.service';

@Module({
  imports: [
    ConfigModule,
    RiotModule, 
    DiscordModule.forRoot({
      token: 'ODIzMjcwODgwNTg2NjI5MTQw.YFeYwQ.y_FDzII4MHyHHUQX_02IFeHfu3Y',
      commandPrefix: '!',
    })
  ],
  controllers: [BotController],
  providers: [BotService],
})
export class BotModule {}
