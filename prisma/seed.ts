import { PrismaClient } from "../prisma/client/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@marchtothepolls.org";

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (existing) {
    console.log(`Admin user ${adminEmail} already exists (id: ${existing.id}), skipping seed.`);
    return;
  }

  const user = await prisma.user.create({
    data: {
      email: adminEmail,
      name: "Admin User",
      firstName: "Admin",
      lastName: "User",
      role: "admin",
      emailVerified: true,
    },
  });

  await prisma.account.create({
    data: {
      id: `${user.id}-email`,
      accountId: adminEmail,
      providerId: "email",
      userId: user.id,
    },
  });

  console.log(`Seeded admin user: ${adminEmail} (id: ${user.id})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
