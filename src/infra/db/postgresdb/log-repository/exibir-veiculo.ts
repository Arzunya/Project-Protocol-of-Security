import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getVeiculo() {
  const veiculo = await prisma.veiculo.findMany({
    take: 50,
    orderBy: { id: "desc" }, 
  });
  return veiculo;
}
