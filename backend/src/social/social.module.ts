import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Oauth } from './entities/oauth.entity';
import { TwitchController } from './twitch/twitch.controller';
import { TwitchService } from './twitch/twitch.service';
import { EveOnlineController } from './eve-online/eve-online.controller';
import { EveOnlineService } from './eve-online/eve-online.service';
import { HttpModule } from '@nestjs/axios';
import { YoutubeController } from './youtube/youtube.controller';
import { YoutubeService } from './youtube/youtube.service';
import { Killmail } from './entities/killmail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Oauth]), TypeOrmModule.forFeature([Killmail]), HttpModule],
  controllers: [TwitchController, EveOnlineController, YoutubeController],
  providers: [TwitchService, EveOnlineService, YoutubeService],
  exports: [TwitchService]
})
export class SocialModule { }
