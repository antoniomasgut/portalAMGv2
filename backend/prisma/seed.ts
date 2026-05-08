import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import process from 'process';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('admin123', 10);

  // Crear Client de prova
  const client = await prisma.client.upsert({
    where: { id: 'test-client-id' },
    update: {},
    create: {
      id: 'test-client-id',
      companyName: 'AMG Enginyeria Digital',
      contactName: 'Antonio Mas',
      contactEmail: 'antonio@amg.com',
      status: 'ACTIVE',
    },
  });

  // Crear Usuari Admin
  await prisma.user.upsert({
    where: { email: 'antonio@amg.com' },
    update: { password },
    create: {
      email: 'antonio@amg.com',
      password,
      role: 'ADMIN',
      clientId: client.id,
    },
  });

  // Crear un Flux template
  const flow = await prisma.flow.upsert({
    where: { id: 'template-flow-1' },
    update: {},
    create: {
      id: 'template-flow-1',
      name: 'Sistema de Captació + Agenda',
      description: 'Flux complet per a serveis professionals.',
      isActive: true,
      phases: {
        create: [
          { name: 'Intake', orderIndex: 1, setupPrice: 300, monthlyPrice: 50, isActive: true },
          { name: 'Routing', orderIndex: 2, setupPrice: 200, monthlyPrice: 30, isActive: true },
          { name: 'Booking', orderIndex: 3, setupPrice: 400, monthlyPrice: 40, isActive: true },
          { name: 'Retention', orderIndex: 4, setupPrice: 150, monthlyPrice: 20, isActive: true },
        ]
      }
    },
  });

  // Clonar el flux per al client de prova si no existeix
  const existingTenantFlow = await prisma.tenantFlow.findFirst({
    where: { tenantId: client.id, flowId: flow.id }
  });

  if (!existingTenantFlow) {
    const tenantFlow = await prisma.tenantFlow.create({
      data: {
        tenantId: client.id,
        flowId: flow.id,
        name: flow.name,
        description: flow.description,
        isActive: true,
      }
    });

    const phases = await prisma.phase.findMany({ where: { flowId: flow.id } });
    for (const p of phases) {
      await prisma.tenantPhase.create({
        data: {
          tenantFlowId: tenantFlow.id,
          name: p.name,
          orderIndex: p.orderIndex,
          status: p.orderIndex === 1 ? 'ACTIVE' : 'PENDING',
          setupPrice: p.setupPrice || 0,
          monthlyPrice: p.monthlyPrice || 0,
          isActive: true,
          activatedAt: p.orderIndex === 1 ? new Date() : null,
        }
      });
    }
    console.log('Flux clonat per al tenant de prova.');
  }

  console.log('Seed completat: antonio@amg.com / admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
