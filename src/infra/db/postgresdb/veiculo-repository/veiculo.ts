import { PrismaClient } from "@prisma/client";
import { AddVeiculoRepository } from "../../../../data/protocols/add-veiculo-repository"
import { AddVeiculoModel } from "../../../../domain/usecases/add-veiculo"
import { veiculoModel } from "../../../../domain/models/veiculo"

export class VeiculoPostgreRepository implements AddVeiculoRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient({ log: ["info", "query", "warn"]});
    }

    async add(veiculo: AddVeiculoModel): Promise<veiculoModel> {
        console.log(veiculo);

        
        const veiculoExistente = await this.prisma.veiculo.findFirst({
            where: {
                placa: veiculo.placa
            }    
        });

        console.log("oi1")

        if (veiculoExistente) {
            throw'Já existe um veiculo com essa placa.'
        }

        
        const criarVeiculo = await this.prisma.veiculo.create({
            data: {
                marca: veiculo.marca,
                modelo: veiculo.modelo,
                cor: veiculo.cor,
                placa: veiculo.placa
            }
        })

        console.log(criarVeiculo, "oi2")


        return criarVeiculo;
    }
}
