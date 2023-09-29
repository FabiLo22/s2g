import { Test, TestingModule } from '@nestjs/testing';
import { AbyssalController } from './abyssal.controller';

describe('AbyssalController', () => {
  let controller: AbyssalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbyssalController],
    }).compile();

    controller = module.get<AbyssalController>(AbyssalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
