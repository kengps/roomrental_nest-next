import { Controller } from '@nestjs/common';
import { KnexjsService } from './knexjs.service';

@Controller()
export class KnexjsController {
  constructor(private readonly knexjsService: KnexjsService) {}
}
