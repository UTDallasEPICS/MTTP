import { PrismaClient } from "@/prisma/client/client";
import path from "node:path";

const dbPath = process.env.DATABASE_URL?.startsWith("file:")
  ? `file:${path.resolve(process.cwd(), "prisma/dev.db")}`
  : process.env.DATABASE_URL;

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbPath,
    },
  },
});
