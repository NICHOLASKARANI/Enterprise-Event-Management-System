import { Resolver, Query } from '@nestjs/graphql';
import { HealthService } from './health.service';

@Resolver()
export class HealthResolver {
  constructor(private healthService: HealthService) {}

  @Query(() => String)
  async health(): Promise<string> {
    return this.healthService.check();
  }

  @Query(() => Object)
  async systemStatus() {
    return this.healthService.getSystemStatus();
  }
}