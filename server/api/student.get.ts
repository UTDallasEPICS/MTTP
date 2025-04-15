import { PrismaClient } from '@prisma/client';

;

export default defineEventHandler(async (event) => {

  // get the cookie out of getCookie
  // user = JSON.parse() to turn cookie string into object
  // role is then availalbe on user.role
  // if(user.role != 'admin') return
  let queryParams = new URLSearchParams(event._path)
  const [key, value] = queryParams;
  let orderOption = key[1];
  try {
    let students;
    if (orderOption == 'author') {
      students = await event.context.client.student.findMany({
      include: {
        author: true,
      },
      orderBy: {
        author: {
          firstName: 'asc'
        }
      },
      })
    } else if (orderOption != '') {
        students = await event.context.client.student.findMany({
        include: {
          author: true,
        },
        orderBy: {
          [orderOption]: 'asc',
        },
      });
    } else {
        students = await event.context.client.student.findMany({
        include: {
          author: true,
        },
      });
    }
    return students;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error; // Rethrow the error so it can be handled elsewhere
  } finally {
    await event.context.client.$disconnect(); // Disconnect Prisma client when done
  }
});
