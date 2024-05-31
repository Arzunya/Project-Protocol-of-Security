import { describe, test, expect, beforeAll, afterAll, afterEach } from "vitest";
import { AccountPostgreRepository } from './account';
import { PrismaClient } from '@prisma/client';
import { AddAccountModel } from '../../../../domain/usecases/add-account';

describe('Account Postgre Repository', () => {
    let prisma: PrismaClient;
    let sut: AccountPostgreRepository;

    beforeAll(() => {
        prisma = new PrismaClient();
        sut = new AccountPostgreRepository();
    });

    afterEach(async () => {
        
        await prisma.usuario.deleteMany(); 
    });

    afterAll(async () => {
        
        await prisma.$disconnect();
    });

    test('Should return an account on success', async () => {
        const accountData: AddAccountModel = {
            id: 'any_id',
            nome: 'any_name',
            senha: 'any_senha',
            setor: "any_setor"
        };

        const insertedAccount = await sut.add(accountData);

        expect(insertedAccount).toBeTruthy();
        expect(insertedAccount.id).toBe(accountData.id);
        expect(insertedAccount.nome).toBe(accountData.nome);
        expect(insertedAccount.senha).toBe(accountData.senha);
        expect(insertedAccount.setor).toBe(accountData.setor)


    });
});
