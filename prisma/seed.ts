import { PrismaClient } from "./generated/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL,
  }),
});

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
