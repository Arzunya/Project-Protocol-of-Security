import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getLogZonaUm(id: number) {
  const logZonaUm = await prisma.zona.findUnique({
    where: {
      id: id
    },
    include: {
      dispositivos: true
    },
  });

  console.log(logZonaUm)
  return logZonaUm;
}
