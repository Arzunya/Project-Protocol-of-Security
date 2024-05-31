import { PrismaClient, usuario } from "@prisma/client";
import { DelAccountRepository } from "../../../../data/protocols/del-account-repository";
import { DelAccountModel } from "../../../../domain/usecases/del-account";
import { IntelbrasDeletarUsuario } from "../../../intelbras/controllers/user/del-user";
import { ok } from "../../../../presentention/helpers/http-helper";
import { HttpResponse } from "../../../../presentention/protocols";
import cron from "node-cron";

export class DelAccountPostgreRepository implements DelAccountRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({ log: ["info", "query", "warn"] });
  }

  async del(accountData: DelAccountModel): Promise<HttpResponse> {
    const { id, status } = accountData;

    const conta = await this.prisma.usuario.findUnique({
      where: { id: Number(id) },
      include: {
        acesso_usuario: { include: { acesso: { include: { dispositivo_acesso: { include: { dispositivo: true } } } } } },
      },
    });

    if (!conta) {
      throw "Conta não encontrada!";
    }

    const ips: string[] = [];
    conta.acesso_usuario.forEach((a) => {
      a.acesso.dispositivo_acesso.forEach((b) => {
        if (b.dispositivo.ip) {
          ips.push(b.dispositivo.ip);
        }
      });
    });

    if (ips.length >= 1) {
      const intelbrasDeletarUsuario = new IntelbrasDeletarUsuario();
      for (const ip of ips) {
        console.log(`Enviando solicitação para exclusão do usuário ID ${id} no dispositivo com IP ${ip}`);
        const exclusaoDispositivo = await intelbrasDeletarUsuario.del({ UserID: id, ip });
        if (!exclusaoDispositivo) {
          throw `Falha na exclusão do dispositivo com IP: ${ip}`;
        }
      }
    }

    const updatedAccount = await this.prisma.usuario.update({
      where: { id: Number(id) },
      data: { status: Number(status) },
    });

    if (!updatedAccount) {
      throw "Erro ao atualizar status do usuário no banco de dados.";
    }

    await this.prisma.acesso_usuario.deleteMany({
      where: { usuario_id: Number(id) },
    });

    return ok(updatedAccount, "Status do usuário atualizado com sucesso");
  }

  async desativarUsuariosExpirados() {
    const agora = new Date();
    const vinteQuatroHorasAtras = new Date(agora.getTime() - 24 * 60 * 60 * 1000);
    const usuariosParaDesativar: usuario[] = await this.prisma.$queryRaw<usuario[]>`
      SELECT * FROM usuario 
      WHERE tipo = 2 
        AND "createdAt" <= ${vinteQuatroHorasAtras} 
        AND status != 1`;

    for (const usuario of usuariosParaDesativar) {
      try {
        await this.del({ id: usuario.id, status: 1 });
      } catch (error) {
        console.error(`Falha ao desativar usuário com ID ${usuario.id}:`, error);
      }
    }
  }
}

cron.schedule("0 * * * *", async () => {
  const delAccountRepository = new DelAccountPostgreRepository();
  await delAccountRepository.desativarUsuariosExpirados();
});
