import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UsuarioComPhotoData {
  id: number;
  PhotoData: string;
}

// Busca os usuários por nível de acesso e retorna PhotoData e UserID
export async function buscarUsuariosComPhotoDataPorNivel(idAcesso: number): Promise<UsuarioComPhotoData[]> {
  const usuarios = await prisma.usuario.findMany({
    where: { acesso_usuario: { every: { acesso: { id: idAcesso } } } },
    select: {
      id: true,
      PhotoData: true,
    },
  });
  return usuarios;
}
