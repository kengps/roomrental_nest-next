import { Test, TestingModule } from '@nestjs/testing';
import { KnexjsService } from './knexjs.service';

describe('KnexjsService', () => {
  let service: KnexjsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KnexjsService],
    }).compile();

    service = module.get<KnexjsService>(KnexjsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
