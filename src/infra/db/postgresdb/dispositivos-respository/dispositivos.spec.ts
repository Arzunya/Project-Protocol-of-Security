import { describe, test, expect, beforeAll, afterAll, afterEach } from "vitest";
import { DispositivosPosgresRepository } from "./dispositivos";
import { PrismaClient } from "@prisma/client";
import { AddDispositivosModel } from '../../../../domain/usecases/add-dispositivos'

describe ('Dipositivos Postgres Repository' , () => {
    let prisma: PrismaClient;
    let sut: DispositivosPosgresRepository;

    beforeAll(() => {
        prisma = new PrismaClient();
        sut = new DispositivosPosgresRepository();
    });

    afterEach(async () => {

        await prisma.dispositivo.deleteMany();
    });

    afterAll(async () => {

        await prisma.$disconnect();
    });

    test('Deve retornar um Dispositivo em caso de sucesso', async () => {
        const DispositivosData: AddDispositivosModel = {
            n_serial: "any_n_serial",
            ip: "any_ip"
        };

        const insertedDispositivos = await sut.add(DispositivosData);

        expect(insertedDispositivos).toBeTruthy();
        expect(insertedDispositivos.n_serial).toBe(DispositivosData.n_serial);
        expect(insertedDispositivos.ip).toBe(DispositivosData.ip);
    })
})