import { PrismaClient } from "@prisma/client";
import { DelDispoAcessoRepository } from "../../../../data/protocols/del-DispoAcesso-repository";
import { DelDispoAcessoModel } from "../../../../domain/usecases/del-DispoAcesso";
import { ok, serverError } from "../../../../presentention/helpers/http-helper";
import { HttpResponse } from "../../../../presentention/protocols";

export class DelDispoAcessoPostgreRepository implements DelDispoAcessoRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({ log: ["info", "query", "warn"] });
  }

  async del(perfil: DelDispoAcessoModel): Promise<HttpResponse> {
    const acessoDispositivo = await this.prisma.dispositivo_acesso.delete({
      where: { id: perfil.id },
    });

    return ok(acessoDispositivo, "Ligação entre acesso e dispositivo desfeita com sucesso.");
  }
}
