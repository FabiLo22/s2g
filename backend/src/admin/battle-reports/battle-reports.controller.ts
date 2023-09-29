import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { BattleReport } from './entities/battlereport.entity';
import { Response } from 'express';
import { BattleReportsService } from './battle-reports.service';

@Controller('battlereports')
export class BattleReportsController {
  constructor(private battleReportsService: BattleReportsService) { }

  @Get()
  async getBattleReports(): Promise<BattleReport[]> {
    return await this.battleReportsService.getBattleReports();
  }

  @Get(':id')
  async getBattleReport(@Param('id') id): Promise<BattleReport> {
    return await this.battleReportsService.getBattleReportById(id);
  }

  @Put()
  async createBattlerReport(): Promise<BattleReport> {
    return await this.battleReportsService.createBattleReport();
  }

  @Post()
  async updateBattleReport(@Res() res: Response, @Body() body): Promise<BattleReport> {
    return await this.battleReportsService.updateBattleReport(body);
  }

  @Delete(':id')
  async deleteBattleReport(@Res() res: Response, @Param('id') id: string) {
    this.battleReportsService.deleteBattleReportById(id);

    return res.status(HttpStatus.OK).send();
  }

}
