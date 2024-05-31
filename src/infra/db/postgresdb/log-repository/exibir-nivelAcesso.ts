import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getNiveis() {
    const niveis = await prisma.acesso.findMany({
        include:{dispositivo_acesso: {include:{dispositivo:true}}}});
    return niveis;
}

