import { PrismaClient } from "@prisma/client";
import { AddZonaRepository } from "../../../../data/protocols/add-zona-repository"
import { AddZonaModel } from "../../../../domain/usecases/add-zonas"
import { ZonasModel } from "../../../../domain/models/zonas"

export class ZonaPostgreRepository implements AddZonaRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient({ log: ["info", "query", "warn"]});
    }

    async add(Zona: AddZonaModel): Promise<ZonasModel> {
        console.log(Zona);

        // Verificar se a zona já existe
        const zonaExistente = await this.prisma.zona.findFirst({
            where: {
                nome: Zona.nome
            },
            include: {
                dispositivos: true
            }
        });

        if (zonaExistente) {
            throw'Já existe uma zona com esse nome.'
        }

        // Criar a zona se não existir
        const criarZona = await this.prisma.zona.create({
            data: {
                nome: Zona.nome
            }
        })

        return criarZona;
    }
}
