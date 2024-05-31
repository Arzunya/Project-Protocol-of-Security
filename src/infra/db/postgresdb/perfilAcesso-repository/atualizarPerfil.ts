import { PrismaClient } from "@prisma/client";
import { AddPerfilAcessoRepository } from "../../../../data/protocols/add-perfilAcesso-repository"
import { AddPerfilAcessoModel } from "../../../../domain/usecases/add-perfilDeAcesso"
import { PerfilAcessoModel } from "../../../../domain/models/perfilAcesso"

export class AtualizarPerfilAcessoPostgreRepository implements AddPerfilAcessoRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient({ log: ["info", "query", "warn"]});
    }

    async add(perfil: AddPerfilAcessoModel): Promise<PerfilAcessoModel> {
        console.log(perfil);

        const attZona = await this.prisma.acesso.update({
            where: {
              id: perfil.id,
            },
            data: {
              nivel: perfil.nivel,
            },
          })

        return attZona;
    }
}
