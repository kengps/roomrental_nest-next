import { Controller } from '@nestjs/common';
import { KnexService } from './knex.service';

@Controller()
export class KnexController {
  constructor(private readonly knexService: KnexService) {}
}
