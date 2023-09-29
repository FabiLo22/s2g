import { Test, TestingModule } from '@nestjs/testing';
import { EveOnlineService } from './eve-online.service';

describe('EveOnlineService', () => {
  let service: EveOnlineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EveOnlineService],
    }).compile();

    service = module.get<EveOnlineService>(EveOnlineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
