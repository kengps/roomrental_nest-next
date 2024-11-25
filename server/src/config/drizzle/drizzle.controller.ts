import { Controller } from '@nestjs/common';
import { DrizzleService } from './drizzle.service';

@Controller()
export class DrizzleController {
  constructor(private readonly drizzleService: DrizzleService) {}
}
