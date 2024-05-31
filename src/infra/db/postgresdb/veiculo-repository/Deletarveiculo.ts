import { PrismaClient } from "@prisma/client";
import { DelZonaRepository } from "../../../../data/protocols/del-zona-repository";
import { DelZonaModel } from "../../../../domain/usecases/del-zona";
import { HttpResponse,} from "../../../../presentention/protocols";
import { ok } from "../../../../presentention/helpers/http-helper";


export class DelVeiculoPostgreRepository implements DelZonaRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({ log: ["info", "query", "warn"] });
  }

  async del(delVeiculo: DelZonaModel): Promise<HttpResponse> {
    const veiculo = await this.prisma.veiculo.findFirst({
      where: { id: delVeiculo.id }, 
    });

    if (!veiculo) {
      throw "Veiculo não encontrado!";
    }


    const deletedVeiculo = await this.prisma.veiculo.delete({
      where: { id: veiculo.id },
    });

    if (!deletedVeiculo) {
      throw "Erro ao excluir zona.";
    }

    return ok(deletedVeiculo, "Veiculo excluído com sucesso.");
  }
}
