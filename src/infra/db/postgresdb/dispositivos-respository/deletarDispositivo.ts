import { PrismaClient } from "@prisma/client";
import { DelAccountRepository } from "../../../../data/protocols/del-account-repository";
import { DelAccountModel } from "../../../../domain/usecases/del-account";
import { ok,  } from "../../../../presentention/helpers/http-helper";
import { HttpResponse } from "../../../../presentention/protocols";

export class DelDispositivoPostgreRepository implements DelAccountRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({ log: ["info", "query", "warn"] });
  }

  async del(delDispositivo: DelAccountModel): Promise<HttpResponse> {
    const dispositivo = await this.prisma.dispositivo.findUnique({
      where: { id: delDispositivo.id },
      include: { dispositivo_acesso: true } 
    });

    if (!dispositivo) {
      throw "Dispositivo não encontrado!";
    }

    
    if (dispositivo.dispositivo_acesso.length > 0) {
      throw("Não é possível excluir o dispositivo, pois está vinculado a um dispositivo de acesso.");
    }

    const deletedDispositivo = await this.prisma.dispositivo.delete({
      where: { id: dispositivo.id },
    });

    if (!deletedDispositivo) {
      throw "Erro ao excluir dispositivo.";
    }

    return ok(deletedDispositivo, "Dispositivo excluído com sucesso.");
  }
}
