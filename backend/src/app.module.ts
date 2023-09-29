import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SocialModule } from './social/social.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UserModule } from './user/user.module';
import { SocketGateway } from './socket.gateway';
import { ObsService } from './services/obs/obs.service';
import { OverlayModule } from './overlay/overlay.module';
import { TwitchService } from './social/twitch/twitch.service';
import { Oauth } from './social/entities/oauth.entity';
import { WidgetsModule } from './widgets/widgets.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AdminModule } from './admin/admin.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),    
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGODB_CONNECTION_STRING'),
        database: configService.get<string>('MONGODB_DATABASE'),
        autoLoadEntities: true,
        ssl: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([Oauth]),
    ScheduleModule.forRoot(),
    SocialModule, UserModule, OverlayModule, WidgetsModule, AdminModule],
  controllers: [AppController],
  providers: [AppService, SocketGateway, ConfigService],
})
export class AppModule {
  constructor() {
    console.log(__dirname);
  }
}
