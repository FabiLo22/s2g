import { Test, TestingModule } from '@nestjs/testing';
import { OverlayController } from './overlay.controller';

describe('OverlayController', () => {
  let controller: OverlayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OverlayController],
    }).compile();

    controller = module.get<OverlayController>(OverlayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
