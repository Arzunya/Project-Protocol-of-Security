import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getNiveisUm(id: number) {
    const niveis = await prisma.acesso.findUnique({
        where: {
            id: id,
        },
        include: {
            dispositivo_acesso: {include: {dispositivo: true} },
        },
    });
    console.log(niveis)
    return niveis;
}

