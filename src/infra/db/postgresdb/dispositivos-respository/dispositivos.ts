import { PrismaClient } from "@prisma/client";
import { AddDispositivosRepository } from "../../../../data/protocols/add-dispositivo-repository";
import { AddDispositivosModel } from "../../../../domain/usecases/add-dispositivos";
import { DispositivosModel } from "../../../../domain/models/dipositivos";

export class DispositivosPosgresRepository implements AddDispositivosRepository {
    private prisma: PrismaClient;

    
    constructor() {
        this.prisma = new PrismaClient();
    }

    async add(dispositivoData: AddDispositivosModel): Promise<DispositivosModel> {
        console.log(dispositivoData);

        const zonaExistente = await this.prisma.zona.findUnique({
            where: { id: dispositivoData.zonaId },
        });

        if (!zonaExistente) {
            throw ('Zona não encontrada. Certifique-se de fornecer um ID de zona válido.');
        }

        const ipExistente = await this.prisma.dispositivo.findMany({
            where: { ip: dispositivoData.ip },
        });

        if (ipExistente.length > 0) {
            throw ('Um dispositivo já está cadastrado com este IP, tente outro.');
        }

        const insertedDispositivo = await this.prisma.dispositivo.create({
            data: {
                nome: dispositivoData.nome,
                n_serial: dispositivoData.n_serial,
                ip: dispositivoData.ip,
                zonaId: dispositivoData.zonaId,
                mac: dispositivoData.mac,
                funcionalidade: dispositivoData.funcionalidade
            },
            include: { zona: true },
        });

        const DispositivosModel: DispositivosModel = {
            nome: insertedDispositivo.nome,
            n_serial: insertedDispositivo.n_serial,
            ip: insertedDispositivo.ip,
            zonaId: insertedDispositivo.zonaId ? insertedDispositivo.zonaId : 0,
            zona: insertedDispositivo.zona?.nome ? insertedDispositivo.zona?.nome : "",
            funcionalidade: insertedDispositivo.funcionalidade
        };

        return DispositivosModel;
    }
}
