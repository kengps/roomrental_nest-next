import { Test, TestingModule } from '@nestjs/testing';
import { UsersKnexService } from './users-knex.service';

describe('UsersKnexService', () => {
  let service: UsersKnexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersKnexService],
    }).compile();

    service = module.get<UsersKnexService>(UsersKnexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
