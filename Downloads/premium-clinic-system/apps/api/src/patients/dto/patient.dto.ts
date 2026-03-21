import { ObjectType, Field, ID, InputType, registerEnumType } from '@nestjs/graphql'
import { IsEmail, IsPhoneNumber, IsOptional, IsDate, IsEnum, IsBoolean, IsJSON } from 'class-validator'
import { Gender, User, Appointment, MedicalRecord, Prescription, LabOrder, Invoice, Document } from '@clinic/database'

registerEnumType(Gender, {
  name: 'Gender',
})

@ObjectType()
export class Patient {
  @Field(() => ID)
  id: string

  @Field()
  patientId: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  dateOfBirth: Date

  @Field(() => Gender)
  gender: Gender

  @Field({ nullable: true })
  email?: string

  @Field()
  phone: string

  @Field({ nullable: true })
  address?: string

  @Field({ nullable: true })
  city?: string

  @Field({ nullable: true })
  state?: string

  @Field({ nullable: true })
  zipCode?: string

  @Field({ nullable: true })
  country?: string

  @Field(() => JSON, { nullable: true })
  emergencyContact?: any

  @Field(() => JSON, { nullable: true })
  insuranceInfo?: any

  @Field(() => JSON, { nullable: true })
  medicalHistory?: any

  @Field(() => JSON, { nullable: true })
  allergies?: any

  @Field({ nullable: true })
  bloodType?: string

  @Field({ nullable: true })
  maritalStatus?: string

  @Field({ nullable: true })
  occupation?: string

  @Field({ nullable: true })
  profilePhoto?: string

  @Field({ nullable: true })
  qrCode?: string

  @Field()
  tenantId: string

  @Field({ nullable: true })
  primaryDoctorId?: string

  @Field(() => User, { nullable: true })
  primaryDoctor?: User

  @Field(() => [Appointment], { nullable: true })
  appointments?: Appointment[]

  @Field(() => [MedicalRecord], { nullable: true })
  medicalRecords?: MedicalRecord[]

  @Field(() => [Prescription], { nullable: true })
  prescriptions?: Prescription[]

  @Field(() => [LabOrder], { nullable: true })
  labOrders?: LabOrder[]

  @Field(() => [Invoice], { nullable: true })
  invoices?: Invoice[]

  @Field(() => [Document], { nullable: true })
  documents?: Document[]

  @Field()
  isActive: boolean

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}

@InputType()
export class CreatePatientInput {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  dateOfBirth: Date

  @Field(() => Gender)
  gender: Gender

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string

  @Field()
  @IsPhoneNumber()
  phone: string

  @Field({ nullable: true })
  address?: string

  @Field({ nullable: true })
  city?: string

  @Field({ nullable: true })
  state?: string

  @Field({ nullable: true })
  zipCode?: string

  @Field({ nullable: true })
  country?: string

  @Field(() => JSON, { nullable: true })
  emergencyContact?: any

  @Field(() => JSON, { nullable: true })
  insuranceInfo?: any

  @Field(() => JSON, { nullable: true })
  medicalHistory?: any

  @Field(() => JSON, { nullable: true })
  allergies?: any

  @Field({ nullable: true })
  bloodType?: string

  @Field({ nullable: true })
  maritalStatus?: string

  @Field({ nullable: true })
  occupation?: string

  @Field({ nullable: true })
  primaryDoctorId?: string
}

@InputType()
export class UpdatePatientInput {
  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field({ nullable: true })
  dateOfBirth?: Date

  @Field(() => Gender, { nullable: true })
  gender?: Gender

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  address?: string

  @Field({ nullable: true })
  city?: string

  @Field({ nullable: true })
  state?: string

  @Field({ nullable: true })
  zipCode?: string

  @Field({ nullable: true })
  country?: string

  @Field(() => JSON, { nullable: true })
  emergencyContact?: any

  @Field(() => JSON, { nullable: true })
  insuranceInfo?: any

  @Field(() => JSON, { nullable: true })
  medicalHistory?: any

  @Field(() => JSON, { nullable: true })
  allergies?: any

  @Field({ nullable: true })
  bloodType?: string

  @Field({ nullable: true })
  maritalStatus?: string

  @Field({ nullable: true })
  occupation?: string

  @Field({ nullable: true })
  profilePhoto?: string

  @Field({ nullable: true })
  primaryDoctorId?: string

  @Field({ nullable: true })
  @IsBoolean()
  isActive?: boolean
}

@InputType()
export class PatientFilterInput {
  @Field({ nullable: true })
  search?: string

  @Field({ nullable: true })
  doctorId?: string

  @Field({ nullable: true })
  @IsBoolean()
  isActive?: boolean

  @Field({ nullable: true })
  @IsDate()
  dateOfBirthFrom?: Date

  @Field({ nullable: true })
  @IsDate()
  dateOfBirthTo?: Date
}

@ObjectType()
export class PatientListResponse {
  @Field(() => [Patient])
  patients: Patient[]

  @Field()
  total: number

  @Field()
  page: number

  @Field()
  limit: number

  @Field()
  totalPages: number
}