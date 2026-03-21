import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create main tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Main Clinic',
      subdomain: 'main',
      settings: {
        timezone: 'America/New_York',
        currency: 'USD',
        dateFormat: 'MM/DD/YYYY',
      },
    },
  })

  // Create admin user
  const hashedPassword = await hash('Admin123!', 12)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@clinic.com',
      password: hashedPassword,
      firstName: 'Super',
      lastName: 'Admin',
      role: 'SUPER_ADMIN',
      phone: '+1234567890',
      tenantId: tenant.id,
      emailVerified: true,
    },
  })

  // Create doctors
  const doctors = []
  for (let i = 0; i < 5; i++) {
    const doctor = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: hashedPassword,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        role: 'DOCTOR',
        phone: faker.phone.number(),
        tenantId: tenant.id,
        emailVerified: true,
      },
    })
    doctors.push(doctor)
  }

  // Create patients
  const patients = []
  for (let i = 0; i < 50; i++) {
    const patientId = `P-${new Date().getFullYear()}-${String(i + 1).padStart(5, '0')}`
    const patient = await prisma.patient.create({
      data: {
        patientId,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        dateOfBirth: faker.date.birthdate({ min: 1, max: 90, mode: 'age' }),
        gender: faker.helpers.arrayElement(['MALE', 'FEMALE', 'OTHER']),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        emergencyContact: {
          name: faker.person.fullName(),
          phone: faker.phone.number(),
          relationship: faker.helpers.arrayElement(['Spouse', 'Parent', 'Sibling', 'Friend']),
        },
        medicalHistory: {
          conditions: faker.helpers.arrayElements(['Hypertension', 'Diabetes', 'Asthma'], 2),
          surgeries: [],
        },
        allergies: faker.helpers.arrayElements(['Penicillin', 'Peanuts', 'Latex'], 2),
        bloodType: faker.helpers.arrayElement(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
        tenantId: tenant.id,
        primaryDoctorId: faker.helpers.arrayElement(doctors).id,
      },
    })
    patients.push(patient)
  }

  // Create appointments
  for (let i = 0; i < 100; i++) {
    const startTime = faker.date.between({ from: new Date('2024-01-01'), to: new Date('2024-12-31') })
    const endTime = new Date(startTime)
    endTime.setHours(endTime.getHours() + 1)

    await prisma.appointment.create({
      data: {
        appointmentNumber: `AP-${startTime.getFullYear()}${String(startTime.getMonth() + 1).padStart(2, '0')}${String(startTime.getDate()).padStart(2, '0')}-${String(i + 1).padStart(5, '0')}`,
        patientId: faker.helpers.arrayElement(patients).id,
        doctorId: faker.helpers.arrayElement(doctors).id,
        tenantId: tenant.id,
        startTime,
        endTime,
        status: faker.helpers.arrayElement(['SCHEDULED', 'COMPLETED', 'CANCELLED']),
        type: faker.helpers.arrayElement(['Consultation', 'Follow-up', 'Check-up']),
        reason: faker.lorem.sentence(),
        createdById: admin.id,
      },
    })
  }

  console.log('✅ Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })