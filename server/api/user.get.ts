



export default defineEventHandler(async() => {
    return await event.context.client.user.findMany()
})