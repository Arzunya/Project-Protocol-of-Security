import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsuarioVarios() {
  const tiposUsuario = await prisma.tipo.findMany({
    take: 50,
    
    orderBy: { id: "desc" },
    
  });

  return tiposUsuario;
}
