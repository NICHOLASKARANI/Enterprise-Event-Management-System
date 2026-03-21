// apps/api/src/monitoring/monitoring.service.ts
import { Injectable, Logger } from '@nestjs/common'
import * as Sentry from '@sentry/node'

@Injectable()
export class MonitoringService {
  private readonly logger = new Logger(MonitoringService.name)

  logError(error: Error, context?: any) {
    this.logger.error(error.message, error.stack)
    
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(error, {
        extra: context,
      })
    }
  }

  trackMetric(name: string, value: number, tags?: Record<string, string>) {
    // Send to Datadog/New Relic
  }
}