import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDispositivosTipo() {
  const dispositivos = await prisma.dispositivo.findMany({
    include: { zona: true, funcionalidade_dispositivo: true },
    where: {
      funcionalidade: 1,
    },
    
  });
  return dispositivos;
}
