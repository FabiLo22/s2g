import { Module } from '@nestjs/common';
import { BattleReportsController } from './battle-reports/battle-reports.controller';
import { BattleReportsService } from './battle-reports/battle-reports.service';
import { BattleReport } from './battle-reports/entities/battlereport.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BattleReport])],
  controllers: [BattleReportsController],
  providers: [BattleReportsService]
})
export class AdminModule { }
