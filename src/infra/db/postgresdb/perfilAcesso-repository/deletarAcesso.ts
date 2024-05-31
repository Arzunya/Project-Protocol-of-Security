import { PrismaClient } from "@prisma/client";
import { DelAcessoRepository } from "../../../../data/protocols/del-acesso-repository";
import { DelPerfilAcessoModel } from "../../../../domain/usecases/del-perfilAcesso";
import { ok } from "../../../../presentention/helpers/http-helper";
import { HttpResponse } from "../../../../presentention/protocols";

export class DelAcessoPostgreRepository implements DelAcessoRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({ log: ["info", "query", "warn"] });
  }

  async del(perfil: DelPerfilAcessoModel): Promise<HttpResponse> {
    // Encontra o acesso pelo ID
    const acesso = await this.prisma.acesso.findUnique({
      where: { id: perfil.id },
      include: { acesso_usuario: true, dispositivo_acesso: true },
    });

    if (!acesso) {
      throw "Acesso não encontrado!";
    }

    await this.prisma.dispositivo_acesso.deleteMany({
      where: { nivelId: perfil.id },
    });

    await this.prisma.acesso_usuario.deleteMany({
      where: { nivel_usuario: perfil.id },
    });

    const deletedAcesso = await this.prisma.acesso.delete({
      where: { id: acesso.id },
    });

    if (!deletedAcesso) {
      throw "Erro ao excluir acesso.";
    }

    return ok(deletedAcesso, "Acesso excluído com sucesso.");
  }
}
