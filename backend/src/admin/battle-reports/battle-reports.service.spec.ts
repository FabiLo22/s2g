import { Test, TestingModule } from '@nestjs/testing';
import { BattleReportsService } from './battle-reports.service';

describe('BattleReportsService', () => {
  let service: BattleReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BattleReportsService],
    }).compile();

    service = module.get<BattleReportsService>(BattleReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
