import { Module, HttpModule, HttpService } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RiotService } from './riot.service';

@Module({
    imports: [HttpModule, ConfigModule],
    providers: [RiotService],
    exports: [RiotService]
})
export class RiotModule { }
