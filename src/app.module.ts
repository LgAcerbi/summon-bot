import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscordModule } from 'discord-nestjs';
import { BotModule } from './bot/bot.module';
import { RiotModule } from './riot/riot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    RiotModule,
    BotModule
    ],
})
export class AppModule {}
