import { describe, test, expect, beforeAll, afterAll, afterEach } from "vitest";
import { PerfilAcessoPostgreRepository } from './perfilAcesso';
import { PrismaClient } from '@prisma/client';
import { AddPerfilAcessoModel } from '../../../../domain/usecases/add-perfilDeAcesso';

describe('Perfil Acesso Postgre Repository', () => {
    let prisma: PrismaClient;
    let sut: PerfilAcessoPostgreRepository;

    beforeAll(() => {
        prisma = new PrismaClient();
        sut = new PerfilAcessoPostgreRepository();
    });

    afterEach(async () => {
        
        await prisma.usuario.deleteMany(); 
    });

    afterAll(async () => {
        
        await prisma.$disconnect();
    });

    test('Deve retornar um Perfil de Acesso em caso de sucesso', async () => {
        const PerfilAcessoData: AddPerfilAcessoModel = {
            nivel: "any_nivel",
            dispositivos: "any_dispositivos"
        };

        const insertedAccount = await sut.add(PerfilAcessoData);

        expect(insertedAccount).toBeTruthy();
        expect(insertedAccount.nivel).toBe(PerfilAcessoData.nivel);
        expect(insertedAccount.dispositivos).toBe(PerfilAcessoData.dispositivos);


    });
});
