import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Busca os IPs associados ao nível de acesso informado
export async function buscarIPsPorNivelAcesso(idAcesso: number): Promise<string[]> {
  const acessos = await prisma.acesso.findMany({
    where: {
      id: idAcesso,
    },
    include: { dispositivo_acesso: { include: { dispositivo: true } } },
  });
  const dispositivos: string[] = [];

  acessos.map((value) => {
    value.dispositivo_acesso.map((b) => {
      dispositivos.push(b.dispositivo.ip);
    });
  });

  return dispositivos;
}
