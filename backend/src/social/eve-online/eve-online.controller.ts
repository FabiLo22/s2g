import { Body, Controller, Get, HttpStatus, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { EveOnlineService } from './eve-online.service';
import { ConfigService } from '@nestjs/config';

@Controller('eveonline')
export class EveOnlineController {
   
    constructor(private eveonline: EveOnlineService, private configService: ConfigService) {}

    @Get('redirect')
    async getRedirect(@Res() res: Response): Promise<Response> {
        return res.status(HttpStatus.OK).send({ redirect: this.eveonline.sso.getRedirectUrl('my-state', this.configService.get<string>('EVE_ONLINE_SCOPES')) });
    }

    @Put('oauth')
    async putCode(@Res() res: Response, @Body() body): Promise<Response> {
      this.eveonline.handleCode(body.code);

      return res.status(HttpStatus.OK).send();
    }

    @Post('killmails')
    async refreshToken(@Res() res: Response, @Body() body): Promise<Response> {
        body.token.expires = new Date(body.token.expires);
        const killmails = await this.eveonline.esi.request(
            '/corporations/98693798/killmails/recent/',
            null,
            null,
            { token: body.token }
            )
    
        return res.status(HttpStatus.OK).send(killmails);
    }
}
