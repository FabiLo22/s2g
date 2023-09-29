import { Body, Controller, Get, HttpStatus, Put, Res } from '@nestjs/common';

import { Response, Request } from 'express';
import { YoutubeService } from './youtube.service';

@Controller('youtube')
export class YoutubeController {
    constructor(private youtube: YoutubeService) { }

    @Get('redirect')
    async getRedirect(@Res() res: Response): Promise<Response> {
        return res.status(HttpStatus.OK).send({ redirect: this.youtube.redirect });
    }

    @Put('oauth')
    async putCode(@Res() res: Response, @Body() body): Promise<Response> {
        this.youtube.handleToken(body);
        return res.status(HttpStatus.OK).send();
    }
}
