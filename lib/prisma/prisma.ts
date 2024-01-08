import { PrismaClient, Prisma } from '@prisma/client'
import { DbError, DbStatusCode } from '../types'

const queryEvent = (e: any) => {
  console.log(e)
}

const prismaClientSingleton = () => {

  const client = new PrismaClient({
    errorFormat: 'pretty',
    log: [
      { level: 'query', emit: 'event' },
      { level: 'warn', emit: 'event' },
      { level: 'info', emit: 'event' },
      { level: 'error', emit: 'event' },
    ]
  })

  client.$on('query', queryEvent);

  return client;
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const marshallError = (error: Error): DbError|undefined => {

  let dbError: DbError|undefined = undefined;
  let arr_message = error.message.split("\n");
  let message = arr_message.length ? arr_message[arr_message.length-1] : '';

  if (error instanceof Prisma.PrismaClientKnownRequestError) {

    const fields = error?.meta?.target ? 
      Object.values(error?.meta?.target).join(", ") : 
        undefined;

    if (error.code === 'P2002') {
      dbError = {
        code: DbStatusCode.UNIQUE_ENTRY_VIOLATION,
        message: error.code + ': ' + message,
        fields
      }
    } else {
      dbError = {
        code: DbStatusCode.UNDEFINED_ERROR,
        message: error.code + ': ' + message,
        fields
      }
    }
  } else {
    dbError = {
      code: DbStatusCode.UNDEFINED_ERROR,
      message: error.message
    }
  }

  return dbError;
}

export default prisma;

