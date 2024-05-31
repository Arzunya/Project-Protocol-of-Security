import { PrismaClient } from "@prisma/client";
import { AddZonaRepository } from "../../../../data/protocols/add-zona-repository"
import { AddZonaModel } from "../../../../domain/usecases/add-zonas"
import { ZonasModel } from "../../../../domain/models/zonas"

export class AtualizarZonaPostgreRepository implements AddZonaRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient({ log: ["info", "query", "warn"]});
    }

    async add(Zona: AddZonaModel): Promise<ZonasModel> {
        console.log(Zona);

        const veriZona = await this.prisma.zona.findFirst({
          where: {
            id: Zona.id
          }
        })

        if (!veriZona) {
          throw "Zona não encontrada!";
        }

        const attZona = await this.prisma.zona.update({
            where: {
              id: Zona.id,
            },
            data: {
              nome: Zona.nome,
            },
          })


        return attZona;
    }
}
