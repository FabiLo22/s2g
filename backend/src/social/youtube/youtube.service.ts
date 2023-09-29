import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleAuth, OAuth2Client } from 'google-auth-library';
import { Oauth } from '../entities/oauth.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class YoutubeService {
    private auth = new GoogleAuth({
        scopes: this.configService.get<string>('YOUTUBE_SCOPE').split(', ')
    });
    private oauth = new OAuth2Client(
        this.configService.get<string>('YOUTUBE_CLIENT_ID'),
        this.configService.get<string>('YOUTUBE_CLIENT_SECRET'),
        this.configService.get<string>('YOUTUBE_CALLBACK_URL')
    )
    private token: Oauth = {
        name: 'youtube',
        accessToken: null,
        refreshToken: null,
        expiresIn: 0,
        obtainmentTimestamp: 0
    };
    private initialized: Boolean = false;
    public redirect: String;

    constructor(@InjectRepository(Oauth) private readonly oauthRepository: MongoRepository<Oauth>, private configService: ConfigService) {
        this.redirect = this.oauth.generateAuthUrl({
            access_type: 'offline',
            scope: this.configService.get<string>('YOUTUBE_SCOPE').split(', '),
            prompt: 'consent'
        });

        this.oauth.on('tokens', token => {
            this.oauth.setCredentials(token);
            this.updateToken(token);
            this.initialized = true;
        })

        this.initialize();
    }

    private async initialize() {
        await this.initializeToken();
    }

    private async initializeToken() {
        const token = await this.oauthRepository.findOneBy({ 'name': 'youtube' });

        if (token) {
            this.oauth.setCredentials({
                access_token: token.accessToken,
                refresh_token: token.refreshToken,
                scope: this.configService.get<string>('YOUTUBE_SCOPE').split(', ').join(' '),
                token_type: 'Baerer',
                expiry_date: token.obtainmentTimestamp
            });
            this.token = token;

            if (token.obtainmentTimestamp > new Date().getTime()) {
                this.initialized = true;
            } else {
                this.oauth.refreshAccessToken();
            }
        }
    }

    public async handleToken(code) {
        this.oauth.getToken(code);
    }

    private async updateToken(token) {
        this.token.accessToken = token.access_token;
        this.token.refreshToken = token.refresh_token;
        this.token.expiresIn = 0;
        this.token.obtainmentTimestamp = token.expiry_date;

        this.oauthRepository.save(this.token);
    }
}
