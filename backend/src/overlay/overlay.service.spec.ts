import { Test, TestingModule } from '@nestjs/testing';
import { OverlayService } from './overlay.service';

describe('OverlayService', () => {
  let service: OverlayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OverlayService],
    }).compile();

    service = module.get<OverlayService>(OverlayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
