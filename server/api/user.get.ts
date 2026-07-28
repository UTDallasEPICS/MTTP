export default defineEventHandler(async(event) => {
    const session = event.context.session;
    if (!session?.user || session.user.role !== "admin") {
      return createError({ statusCode: 403, statusMessage: "Forbidden" });
    }

    return await event.context.client.user.findMany()
})
