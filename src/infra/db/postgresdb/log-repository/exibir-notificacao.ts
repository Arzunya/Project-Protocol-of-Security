import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getNotificacao() {
  const notificacao = await prisma.notificacao.findMany({
    take: 50,
    orderBy: { id: "desc" },
  });
  return notificacao;
}
