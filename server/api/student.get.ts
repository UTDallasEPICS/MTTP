import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    if (orderOption == 'firstName') {
        students = await prisma.student.findMany({
        include: {
          author: true,
        },
        orderBy: {
          firstName: 'asc',
        },
      });
    } else if (orderOption == 'lastName') {
        students = await prisma.student.findMany({
        include: {
          author: true,
        },
        orderBy: {
          lastName: 'asc',
        },
      });
    } else if (orderOption == 'schoolName') {
        students = await prisma.student.findMany({
        include: {
          author: true,
        },
        orderBy: {
          schoolName: 'asc',
        },
      });
    } else if (orderOption == 'county') {
        students = await prisma.student.findMany({
        include: {
          author: true,
        },
        orderBy: {
          county: 'asc',
        },
      });
    } else {
        students = await prisma.student.findMany({
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
    await prisma.$disconnect(); // Disconnect Prisma client when done
  }
});
