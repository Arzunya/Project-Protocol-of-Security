import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDispositivoUm(id: number) {
  const dispositivos = await prisma.dispositivo.findUnique({ 
    where: {
      id: id,
    },
    include: {
      zona: true,
    },
  });
  
  console.log(dispositivos)
  return dispositivos;
}
