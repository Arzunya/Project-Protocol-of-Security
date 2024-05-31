import { PrismaClient } from "@prisma/client";
import { DelZonaRepository } from "../../../../data/protocols/del-zona-repository";
import { DelZonaModel } from "../../../../domain/usecases/del-zona";
import { HttpResponse,} from "../../../../presentention/protocols";
import { ok } from "../../../../presentention/helpers/http-helper";


export class DelZonaPostgreRepository implements DelZonaRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({ log: ["info", "query", "warn"] });
  }

  async del(delDispositivo: DelZonaModel): Promise<HttpResponse> {
    const zona = await this.prisma.zona.findUnique({
      where: { id: delDispositivo.id },
      include: { dispositivos: true } 
    });

    if (!zona) {
      throw "Zona não encontrada!";
    }

    
    if (zona.dispositivos.length > 0) {
      throw("Não é possível excluir a zona, pois está vinculada a um dispositivo.");
    }

    const deletedZona = await this.prisma.zona.delete({
      where: { id: zona.id },
    });

    if (!deletedZona) {
      throw "Erro ao excluir zona.";
    }

    return ok(deletedZona, "Zona excluída com sucesso.");
  }
}
