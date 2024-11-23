import { Test, TestingModule } from '@nestjs/testing';
import { JsonplaceholderController } from './jsonplaceholder.controller';

describe('JsonjsonplaceholderController', () => {
  let controller: JsonplaceholderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JsonplaceholderController],
    }).compile();

    controller = module.get<JsonplaceholderController>(JsonplaceholderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
