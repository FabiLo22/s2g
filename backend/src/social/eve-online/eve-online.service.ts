import SingleSignOn from '@after_ice/eve-sso';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Oauth } from '../entities/oauth.entity';
import { MongoRepository } from 'typeorm';
import { Subject, catchError, firstValueFrom, ignoreElements } from 'rxjs';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';

import { ids } from './ids';
import { Killmail } from '../entities/killmail.entity';

@Injectable()
export class EveOnlineService {

  public sso: any = new SingleSignOn(this.configService.get<string>('EVE_ONLINE_CLIENT_ID'), this.configService.get<string>('EVE_ONLINE_CLIENT_SECRET'), this.configService.get<string>('EVE_ONLINE_CALLBACK_URL'));
  public esi: any = 'https://esi.evetech.net/latest';
  private token: Oauth = {
    name: 'eveonline',
    accessToken: null,
    refreshToken: null,
    expiresIn: 0,
    obtainmentTimestamp: 0
  };
  private initialized: Boolean = false;

  private onToken: Subject<any> = new Subject();

  constructor(@InjectRepository(Oauth) private readonly oauthRepository: MongoRepository<Oauth>, @InjectRepository(Killmail) private readonly killmailRepository: MongoRepository<Killmail>, private configService: ConfigService, private http: HttpService) {
    this.onToken.subscribe(token => {
      this.updateToken(token);
    });

    this.initialize();
  }

  @Cron('0 */5 * * * *')
  async handleCron() {
    console.log('cron job works', this.initialized);

    ids.forEach(async (id) => {
      const killmails = await firstValueFrom(this.http.get('https://zkillboard.com/api/kills/' + id.type + 'ID/' + id.id + '/npc/0/',
        {
          headers: {
            'User-Agent': 'Maintainer: Fabian L. fabi@locker.cc'
          }
        }).pipe(
          catchError((error: AxiosError) => {
            console.log(error.response.data)
            throw 'An error happened!';
          }),
        ));

      killmails.data.forEach(async (killmail) => {
        const killmailCCP = await this.apiGetRequest(`/killmails/${killmail.killmail_id}/${killmail.zkb.hash}/`);
        const killmailCheck = await this.killmailRepository.findOneBy({ killmail_id: killmailCCP.killmail_id });

        if (killmailCCP.victim.character_id !== undefined && !killmailCheck) {
          const victim = await this.apiPostRequest('/universe/names/', [
            killmailCCP.victim.character_id,
            killmailCCP.victim.corporation_id,
            (killmailCCP.victim.alliance_id !== undefined) ? killmailCCP.victim.alliance_id : 117115316,
            killmailCCP.victim.ship_type_id
          ]);

          const killmailDB: Killmail = {
            killmail_id: killmailCCP.killmail_id,
            killmail_time: parseInt((new Date(killmailCCP.killmail_time).getTime() / 1000).toFixed(0)),
            solar_system: (await this.apiGetRequest(`/universe/systems/${killmailCCP.solar_system_id}/`)).name,
            victim: {
              character_id: killmailCCP.victim.character_id,
              name: victim.find(val => val.category == 'character').name,
              corporation: victim.find(val => val.category == 'corporation').name,
              alliance: (killmailCCP.victim.alliance_id !== undefined) ? victim.find(val => val.category == 'alliance').name : 'none',
              ship: victim.find(val => val.category == 'inventory_type').name,
            },
            attackers: [],
            value: killmail.zkb.totalValue
          }

          for (const attacker of killmailCCP.attackers) {
            if (attacker.character_id !== undefined) {
              const attackerCCP = await this.apiPostRequest('/universe/names/', [
                attacker.character_id,
                attacker.corporation_id,
                (attacker.alliance_id !== undefined) ? attacker.alliance_id : 117115316,
                (attacker.ship_type_id !== undefined) ? attacker.ship_type_id : attacker.weapon_type_id,
              ]);

              killmailDB.attackers.push({
                character_id: attacker.character_id,
                name: attackerCCP.find(val => val.category == 'character').name,
                corporation: attackerCCP.find(val => val.category == 'corporation').name,
                alliance: (attacker.alliance_id !== undefined) ? attackerCCP.find(val => val.category == 'alliance').name : 'none',
                ship: attackerCCP.find(val => val.category == 'inventory_type').name,
              })
            }
          }

          this.killmailRepository.save(killmailDB);

          console.log('New Killmail found');
        }
      })
    })
  }

  private async initialize() {
    await this.initializeToken();
  }

  private async initializeToken() {
    const token = await this.oauthRepository.findOneBy({ 'name': 'eveonline' });

    if (token) {
      this.token = token;

      await this.refreshTokenIfExpired();
      this.initialized = true;
    }
  }

  async handleCode(code) {
    this.onToken.next(await this.sso.getAccessToken(code));
  }

  async refreshTokenIfExpired() {
    if (this.token.obtainmentTimestamp < new Date().getTime()) {
      const token = await this.sso.getAccessToken(this.token.refreshToken, true);

      this.token.accessToken = token.access_token;

      this.onToken.next(token);
    }
  }

  async updateToken(token) {
    this.token.accessToken = token.access_token;
    this.token.refreshToken = token.refresh_token;
    this.token.expiresIn = 0;
    this.token.obtainmentTimestamp = Date.now() + token.expires_in;

    await this.oauthRepository.save(this.token);
  }

  async apiGetRequest(url) {
    await this.refreshTokenIfExpired();

    const response = await firstValueFrom(this.http.get(this.esi + url,
      {
        headers: {
          'Authorization': `Bearer ${this.token.accessToken}`
        }
      }).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response.data, url)
          throw 'An error happened!';
        }),
      ));

    return response.data;
  }

  async apiPostRequest(url, payload) {
    await this.refreshTokenIfExpired();

    const response = await firstValueFrom(this.http.post(this.esi + url, payload,
      {
        headers: {
          'Authorization': `Bearer ${this.token.accessToken}`
        }
      }).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response, url, payload)
          throw 'An error happened!';
        }),
      ));

    return response.data;
  }
}
