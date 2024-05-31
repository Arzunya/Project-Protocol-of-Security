import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getLog() {
  const logs = await prisma.log.findMany({ 
    take: 50, 
    orderBy: { id: "desc" }, 
    include: { usuario: true, dispositivo: true }, 
  }); 
  return logs;
}
