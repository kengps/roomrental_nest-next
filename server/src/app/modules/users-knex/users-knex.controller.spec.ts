import { Test, TestingModule } from '@nestjs/testing';
import { UsersKnexController } from './users-knex.controller';
import { UsersKnexService } from './users-knex.service';

describe('UsersKnexController', () => {
  let controller: UsersKnexController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersKnexController],
      providers: [UsersKnexService],
    }).compile();

    controller = module.get<UsersKnexController>(UsersKnexController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
