import { Test, TestingModule } from '@nestjs/testing';
import { EveOnlineController } from './eve-online.controller';

describe('EveOnlineController', () => {
  let controller: EveOnlineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EveOnlineController],
    }).compile();

    controller = module.get<EveOnlineController>(EveOnlineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
