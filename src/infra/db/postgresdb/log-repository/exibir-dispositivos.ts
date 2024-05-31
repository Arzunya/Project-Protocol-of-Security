import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDispositivos() {
  const dispositivos = await prisma.dispositivo.findMany({ include: { zona: true } });
  return dispositivos;
}
