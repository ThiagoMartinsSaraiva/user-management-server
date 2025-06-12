import { PrismaClient } from '@prisma/client'; // ou apenas 'prisma' se não tiver customizado o output

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'Thiago', email: 'thiago@email.com' },
      { name: 'Teste', email: 'teste@teste.com' },
      { name: 'John Doe', email: 'john@doe.com' },
    ],
  });

  console.log('Seed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });