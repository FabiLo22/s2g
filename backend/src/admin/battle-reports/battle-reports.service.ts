import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { BattleReport } from './entities/battlereport.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class BattleReportsService {
  constructor(@InjectRepository(BattleReport) private readonly battleReports: MongoRepository<BattleReport>) { }

  async createBattleReport() {
    const battleReport = new BattleReport();

    battleReport.name = 'New Battle Report';
    battleReport.starttime = Date.now();
    battleReport.endtime = Date.now();
    battleReport.systems = [];

    return await this.battleReports.save(battleReport);
  }

  async updateBattleReport(battleReport) {
    battleReport._id = new ObjectId(battleReport._id);
    return await this.battleReports.save(battleReport);
  }

  async getBattleReports() {
    return await this.battleReports.find();
  }

  async getBattleReportById(id: string) {
    return await this.battleReports.findOneBy({ _id: new ObjectId(id) });
  }

  async deleteBattleReportById(id: string) {
    return await this.battleReports.deleteOne({ _id: new ObjectId(id) });
  }
}
