import { Body, Controller, Get, HttpStatus, Put, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Abyssal } from '../entities/abyssal.entity';
import { Response } from 'express';

@Controller('abyssal')
export class AbyssalController {

    constructor(
        @InjectRepository(Abyssal)
        private readonly abyssalRepository: MongoRepository<Abyssal>
    ) {
    }

    @Get()
    async getAbyssal(): Promise<Abyssal> {
        return await this.abyssalRepository.findOne({});
    }

    @Put()
    async updateAbyssal(@Res() res: Response, @Body() body): Promise<any> {
        const abyssal = await this.abyssalRepository.findOne({});
        abyssal.targetValue = body.targetValue;
        abyssal.currentValue = body.currentValue;

        this.abyssalRepository.save(abyssal);

        return res.status(HttpStatus.OK).send();
    }

}
