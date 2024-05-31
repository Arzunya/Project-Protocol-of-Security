import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsuario(id: number) {
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: id,
    },
    include: {
      acesso_usuario: { include: { acesso: true } }, veiculo_usuario: {include: {veiculo: true}}, 
    },
  });

  console.log(usuario);
  return usuario;
}
