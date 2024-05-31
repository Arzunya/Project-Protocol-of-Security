import { PrismaClient } from "@prisma/client";
import { AddPerfilAcessoRepository } from "../../../../data/protocols/add-perfilAcesso-repository";
import { AddPerfilAcessoModel } from "../../../../domain/usecases/add-perfilDeAcesso";
import { PerfilAcessoModel } from "../../../../domain/models/perfilAcesso";

export class PerfilAcessoPostgreRepository implements AddPerfilAcessoRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({ log: ["query"] });
  }

  async add(perfilData: AddPerfilAcessoModel): Promise<PerfilAcessoModel> {
    console.log(perfilData);

    try {
      const insertedPerfilAcesso = await this.prisma.acesso.create({ data: { nivel: perfilData.nivel } });

      await this.prisma.dispositivo_acesso.createMany({
        data: perfilData.dispositivos.map((disp) => {
          return { nivelId: insertedPerfilAcesso.id, dispositivoId: disp };
        }),
      });

      const PerfilAcessoModel: PerfilAcessoModel = {
        nivel: insertedPerfilAcesso.nivel,
        id: insertedPerfilAcesso.id
      };

      return PerfilAcessoModel;
    } catch (err) {
      console.log(err);
      throw "Erro no banco de dados!";
    }

    
  }
}
