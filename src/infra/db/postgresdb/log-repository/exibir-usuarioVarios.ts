import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsuarioVarios() {
  const usuarioVarios = await prisma.usuario.findMany({
    take: 50,
    orderBy: { id: "desc" },
  });

  usuarioVarios.map((value) => {
    value.PhotoData = "";
  });

  return usuarioVarios;
}
