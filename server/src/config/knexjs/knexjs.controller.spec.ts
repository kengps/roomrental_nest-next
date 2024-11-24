import { Test, TestingModule } from '@nestjs/testing';
import { KnexjsController } from './knexjs.controller';
import { KnexjsService } from './knexjs.service';

describe('KnexjsController', () => {
  let controller: KnexjsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KnexjsController],
      providers: [KnexjsService],
    }).compile();

    controller = module.get<KnexjsController>(KnexjsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
