import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getLogHistorico(id: number) {
  const historico = await prisma.log.findMany({
    where: {
      id: id
    },
    orderBy: {
      id: 'desc'
    },
    include: {
      dispositivo: {
        include: {
          zona: true
        }
      },
      usuario: true
    },
  });

  return historico;
}
