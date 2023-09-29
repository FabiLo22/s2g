import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Ship } from './entities/ship.entity';
import { OverlayService } from './overlay.service';

@Controller('overlay')
export class OverlayController {
    constructor(private overlay: OverlayService) {}

    @Get('ships')
    async getShips(): Promise<Ship[]> {
      return await this.overlay.getShips();
    }
  
    @Get('/ship/:shipname')
    async getUser(@Param('shipname') shipname): Promise<Ship> {
      return await this.overlay.getShip(shipname);
    }
    
    @Post('create/ship')
    async createUser(): Promise<Ship> {
      return this.overlay.createShip({});
    }

    @Get('setup')
    async getSetup(): Promise<Ship[]> {
      return await this.overlay.getSetup();
    } 

    @Put('setup/delete/ship')
    async setupDeleteShip(@Res() res: Response, @Body() body): Promise<any> {
      return await this.overlay.setupDeleteShip(body.id);
    } 
    
    @Post('setup/add/ship')
    async setupAddShip(@Res() res: Response, @Body() body): Promise<any> {
      return this.overlay.setupAddShip(body);
    }    
}
