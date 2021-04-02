import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { RiotModule } from 'src/riot/riot.module';
import { DiscordModule } from 'discord-nestjs'
import { ConfigModule } from '@nestjs/config';
import { BotService } from './bot.service';
import { MessageService } from './message.service';

@Module({
  imports: [
    ConfigModule,
    RiotModule, 
    DiscordModule.forRoot({
      token: process.env.DISCORD_TOKEN,
      commandPrefix: '!',
    })
  ],
  controllers: [BotController],
  providers: [BotService, MessageService],
})
export class BotModule {}
