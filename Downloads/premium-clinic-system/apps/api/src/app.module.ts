import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ThrottlerModule } from '@nestjs/throttler'
import { CacheModule } from '@nestjs/cache-manager'
import { ScheduleModule } from '@nestjs/schedule'
import { redisStore } from 'cache-manager-redis-store'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { PatientsModule } from './patients/patients.module'
import { AppointmentsModule } from './appointments/appointments.module'
import { MedicalRecordsModule } from './medical-records/medical-records.module'
import { PrescriptionsModule } from './prescriptions/prescriptions.module'
import { BillingModule } from './billing/billing.module'
import { InventoryModule } from './inventory/inventory.module'
import { LabModule } from './lab/lab.module'
import { PharmacyModule } from './pharmacy/pharmacy.module'
import { CommunicationsModule } from './communications/communications.module'
import { ReportingModule } from './reporting/reporting.module'
import { AuditModule } from './audit/audit.module'
import { TenantsModule } from './tenants/tenants.module'
import { LoggerMiddleware } from './common/middleware/logger.middleware'
import { TenantMiddleware } from './common/middleware/tenant.middleware'
import configuration from './config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: true,
        playground: configService.get('NODE_ENV') !== 'production',
        introspection: configService.get('NODE_ENV') !== 'production',
        context: ({ req, res }) => ({ req, res }),
        formatError: (error) => ({
          message: error.message,
          code: error.extensions?.code,
          path: error.path,
        }),
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        ttl: 60,
        limit: 100,
      }),
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          url: configService.get('REDIS_URL'),
        }),
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    UsersModule,
    PatientsModule,
    AppointmentsModule,
    MedicalRecordsModule,
    PrescriptionsModule,
    BillingModule,
    InventoryModule,
    LabModule,
    PharmacyModule,
    CommunicationsModule,
    ReportingModule,
    AuditModule,
    TenantsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, TenantMiddleware)
      .forRoutes('*')
  }
}