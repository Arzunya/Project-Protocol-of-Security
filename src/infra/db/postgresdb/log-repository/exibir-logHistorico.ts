import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUltimoLogDoUsuario(id: number) {
  const logsDoUsuario = await prisma.log.findMany({
    
    where: {
      userID: id
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

  if (!logsDoUsuario) {
    throw ('Nenhum log encontrado para o usuário especificado.');
  }

  return logsDoUsuario;
}
