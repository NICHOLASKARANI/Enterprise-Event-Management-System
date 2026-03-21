// apps/api/src/tenants/tenants.service.ts
// Add tenant creation logic

async createTenant(name: string, subdomain: string) {
  return this.prisma.tenant.create({
    data: {
      name,
      subdomain,
      settings: {
        timezone: 'UTC',
        currency: 'USD',
      },
    },
  })
}