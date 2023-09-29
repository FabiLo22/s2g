import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshingAuthProvider } from '@twurple/auth';
import { Oauth } from '../entities/oauth.entity';
import { MongoRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ApiClient, HelixChatBadgeSet } from '@twurple/api';
import { ChatClient, PrivateMessage } from '@twurple/chat';
import { Subject } from 'rxjs';

@Injectable()
export class TwitchService {
  private token: Oauth = {
    name: 'twitch',
    accessToken: null,
    refreshToken: null,
    expiresIn: 0,
    obtainmentTimestamp: 0
  };
  private authProvider = null;
  private initialized = false;
  private channel = null;
  private user = null;
  private badges = null;
  public api: ApiClient = null;
  public chat: Subject<any> = new Subject();

  constructor(@InjectRepository(Oauth)
  private readonly oauthRepository: MongoRepository<Oauth>, private configService: ConfigService) {
    this.initialize();
  }

  private async initialize() {
    await this.initializeToken();

    if (this.initialized) {
      this.initializeAfterToken();
    }
  }

  private async initializeAfterToken() {
    await this.initializeAuthProvider();
    await this.initializeApiClient();
    await this.initializeChat();

    this.user = await this.api.users.getUserByName('knightserrantx');
    this.channel = await this.api.channels.getChannelInfoById(this.user.id);

    const channelBadges = await this.api.chat.getChannelBadges(this.channel.id);
    const globalBades = await this.api.chat.getGlobalBadges();

    this.badges = channelBadges.concat(globalBades);
  }

  private async initializeToken() {
    const token = await this.oauthRepository.findOneBy({ 'name': 'twitch' });

    if (token) {
      this.token = token;
      this.initialized = true;
    }
  }

  private async initializeAuthProvider() {
    this.authProvider = new RefreshingAuthProvider(
      {
        clientId: this.configService.get<string>('TWITCH_CLIENT_ID'),
        clientSecret: this.configService.get<string>('TWITCH_CLIENT_SECRET'),
        onRefresh: async (userId, newTokenData) => this.updateToken(newTokenData)
      }
    );

    await this.authProvider.addUserForToken(this.token, ['chat']);
  }

  private async initializeApiClient() {
    this.api = new ApiClient({ authProvider: this.authProvider });
  }

  private async initializeChat() {
    const chat = new ChatClient({ authProvider: this.authProvider, channels: ['knightserrantx'] });
    chat.connect();

    chat.onMessage(async (channel: string, user: string, text: string, msg: PrivateMessage) => {
      const _user = await this.api.users.getUserByName(user);

      const res = {
        user,
        displayName: _user.displayName,
        text,
        badges: [],
        color: msg.userInfo.color
      }

      msg.userInfo.badges.forEach((key, _badge) => {
        res.badges.push(this.badges.find(badge => badge.id == _badge)?.getVersion(key).getImageUrl(1));
      });

      this.chat.next(res);
    })
  }

  async updateToken(token) {
    this.token.accessToken = token.accessToken;
    this.token.refreshToken = token.refreshToken;
    this.token.expiresIn = token.expiresIn;
    this.token.obtainmentTimestamp = token.optainmentTimestamp;

    this.oauthRepository.save(this.token);

    if (!this.initialized) {
      this.initializeAfterToken();
    }
  }
}
