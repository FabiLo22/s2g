import { Body, Controller, Get, HttpStatus, Param, Post, RawBodyRequest, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { firstValueFrom } from 'rxjs';

import { Response, Request } from 'express';
import { SocketGateway } from './socket.gateway';

import * as rawbody from 'raw-body';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private configService: ConfigService, private socket: SocketGateway) {
    console.log(this.configService.get<string>('TEST'));
  }

  @Post('/ingest/:streamer')
  async putCode(@Res() res: Response, @Req() req: RawBodyRequest<Request>, @Param() params: any): Promise<Response> {
    const raw = await rawbody(req);

    this.appService.addNewSdp(params.streamer, req.headers['x-real-ip'], raw.toString());

    const stream = this.socket.streams.find(stream => stream.streamer == params.streamer);
    const sdp = await (firstValueFrom(stream.sdp));

    return res.set({ 'Location': '/backend/stream/' + params.streamer }).status(HttpStatus.CREATED).send(sdp);
  }
}

