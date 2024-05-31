import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getLogZonas() {
  const logsZona = await prisma.zona.findMany({
    take: 10,
    include: {dispositivos: true}
    
  });
  return logsZona;
}
