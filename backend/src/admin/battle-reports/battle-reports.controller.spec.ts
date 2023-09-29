import { Test, TestingModule } from '@nestjs/testing';
import { BattleReportsController } from './battle-reports.controller';

describe('BattleReportsController', () => {
  let controller: BattleReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BattleReportsController],
    }).compile();

    controller = module.get<BattleReportsController>(BattleReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
