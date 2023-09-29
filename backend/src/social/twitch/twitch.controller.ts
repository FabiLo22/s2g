import { HttpService } from '@nestjs/axios';
import { Body, Controller, HttpStatus, Param, Put, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { Response } from 'express';
import { catchError, firstValueFrom } from 'rxjs';
import { TwitchService } from './twitch.service';

@Controller('twitch')
export class TwitchController {

  constructor(private http: HttpService, private twitch: TwitchService, private configService: ConfigService) { }

  @Put('oauth')
  async putCode(@Res() res: Response, @Body() body): Promise<Response> {
    const { data } = await firstValueFrom(
      this.http.post<any>('https://id.twitch.tv/oauth2/token', {
        client_id: this.configService.get<string>('TWITCH_CLIENT_ID'),
        client_secret: this.configService.get<string>('TWITCH_CLIENT_SECRET'),
        code: body.code, grant_type: 'authorization_code',
        redirect_uri: this.configService.get<string>('TWITCH_CALLBACK_URL')
      }).pipe(
        catchError((error: AxiosError) => {
          console.log(error);
          throw 'An error happened!';
        }),
      )
    )
    this.twitch.updateToken({ accessToken: data.access_token, refreshToken: data.refresh_token });
    return res.status(HttpStatus.OK).send();
  }
}
