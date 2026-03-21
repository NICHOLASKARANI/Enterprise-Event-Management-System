import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { PatientsService } from './patients.service'
import { Patient, CreatePatientInput, UpdatePatientInput, PatientFilterInput, PatientListResponse } from './dto/patient.dto'
import { GqlAuthGuard } from '../common/guards/gql-auth.guard'
import { RolesGuard } from '../common/guards/roles.guard'
import { Roles } from '../common/decorators/roles.decorator'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { User, UserRole } from '@clinic/database'

@Resolver(() => Patient)
@UseGuards(GqlAuthGuard, RolesGuard)
export class PatientsResolver {
  constructor(private patientsService: PatientsService) {}

  @Mutation(() => Patient)
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.RECEPTIONIST)
  async createPatient(
    @Args('input') createPatientInput: CreatePatientInput,
    @CurrentUser() user: User,
    @Context() context: any,
  ): Promise<Patient> {
    return this.patientsService.create(createPatientInput, context.req.tenantId, user.id)
  }

  @Query(() => PatientListResponse)
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST)
  async patients(
    @Args('filter', { nullable: true }) filter: PatientFilterInput,
    @Args('page', { nullable: true, defaultValue: 1 }) page: number,
    @Args('limit', { nullable: true, defaultValue: 10 }) limit: number,
    @Context() context: any,
  ) {
    return this.patientsService.findAll(context.req.tenantId, filter, page, limit)
  }

  @Query(() => Patient)
  @Roles(UserRole.ADMIN, UserRole.DOCTOR, UserRole.NURSE, UserRole.RECEPTIONIST)
  async patient(
    @Args('id') id: string,
    @CurrentUser() user: User,
    @Context() context: any,
  ): Promise<Patient> {
    return this.patientsService.findOne(id, context.req.tenantId, user.role)
  }

  @Mutation(() => Patient)
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  async updatePatient(
    @Args('id') id: string,
    @Args('input') updatePatientInput: UpdatePatientInput,
    @CurrentUser() user: User,
    @Context() context: any,
  ): Promise<Patient> {
    return this.patientsService.update(id, updatePatientInput, context.req.tenantId, user.id)
  }

  @Mutation(() => Boolean)
  @Roles(UserRole.ADMIN)
  async deletePatient(
    @Args('id') id: string,
    @CurrentUser() user: User,
    @Context() context: any,
  ): Promise<boolean> {
    return this.patientsService.remove(id, context.req.tenantId, user.id)
  }

  @Query(() => Patient)
  async patientByQR(
    @Args('qrData') qrData: string,
    @Context() context: any,
  ): Promise<Patient> {
    return this.patientsService.getPatientByQR(qrData, context.req.tenantId)
  }

  @Query(() => Object)
  @Roles(UserRole.ADMIN)
  async patientStatistics(@Context() context: any) {
    return this.patientsService.getPatientStatistics(context.req.tenantId)
  }
}