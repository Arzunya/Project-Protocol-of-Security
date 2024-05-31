import { PrismaClient } from "@prisma/client";
import { AddVeiculoRepository } from "../../../../data/protocols/add-veiculo-repository"
import { AddVeiculoModel } from "../../../../domain/usecases/add-veiculo"
import { veiculoModel } from "../../../../domain/models/veiculo"

export class AtualizarVeiculoPostgreRepository implements AddVeiculoRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient({ log: ["info", "query", "warn"]});
    }

    async add(Veiculo: AddVeiculoModel): Promise<veiculoModel> {
        console.log(Veiculo);

        const veriVeiculo = await this.prisma.veiculo.findFirst({
          where: {
            id: Veiculo.id
          }
        })

      

        if (!veriVeiculo) {
          throw "Veiculo não encontrado!";
        }

        const attVeiculo = await this.prisma.veiculo.update({
            where: {
              id: Veiculo.id,
            },
            data: {
              marca: Veiculo.marca,
              modelo: Veiculo.modelo,
              cor: Veiculo.cor,
              placa: Veiculo.placa
            },
          })

        return attVeiculo;
    }
}
