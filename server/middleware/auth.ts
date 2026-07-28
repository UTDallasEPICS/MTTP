import { PrismaClient } from "@/prisma/client/client";
import { auth } from "~~/lib/auth";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  event.context.client = prisma;

  const path = event.path || "";

  // Allow BetterAuth routes and the login page through
  if (path.startsWith("/api/auth") || path === "/login") return;

  const session = await auth.api.getSession({ headers: event.headers });
  if (!session?.user) {
    return sendRedirect(event, "/login");
  }

  event.context.session = session;
  event.context.user = session.user;

  setCookie(event, "cvuser", JSON.stringify(session.user));
});
