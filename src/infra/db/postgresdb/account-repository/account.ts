import { PrismaClient } from "@prisma/client";
import { AddAccountRepository } from "../../../../data/protocols/add-account-repository";
import { AddAccountModel } from "../../../../domain/usecases/add-account";
import { AccountModel } from "../../../../domain/models/account";

export class AccountPostgreRepository implements AddAccountRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({ log: ["info", "query", "warn"] });
  }

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const finded = await this.prisma.usuario.findFirst({ where: { matricula: accountData.matricula } });

    if (finded) {
      throw "Matrícula ja cadastrada !";
    }

    try {
      const insertedAccount = await this.prisma.usuario.create({
        data: {
          matricula: accountData.matricula,
          nome: accountData.nome,
          senha: accountData.senha,
          setor: accountData.setor,
          documento: accountData.documento,
          responsavel: accountData.responsavel,
          email: accountData.email,
          observacoes: accountData.observacoes,
          situacaoCadastro: accountData.situacaoCadastro,
          empresa: accountData.empresa,
          PhotoData: accountData.PhotoData,
          tipo: accountData.tipo,
          status:accountData.status,
          ValidFrom: accountData.ValidFrom,
          ValidTo: accountData.ValidTo
        },
      });

      await this.prisma.acesso_usuario.createMany({
        data: accountData.acessos.map((ac) => {
          return { usuario_id: insertedAccount.id, nivel_usuario: ac };
        }),
      });

      const findNewUser = await this.prisma.usuario.findFirst({
        where: { id: insertedAccount.id },
        include: {
          acesso_usuario: { include: { acesso: { include: { dispositivo_acesso: { include: { dispositivo: true } } } } } },
        },
      });
      const dispositivos: { id: number; ip: string | null }[] = [];

      findNewUser?.acesso_usuario.map((a) => {
        a.acesso.dispositivo_acesso.map((b) => {
          dispositivos.push({ id: b.dispositivo.id, ip: b.dispositivo.ip });
          b.dispositivo.ip;
        });
      });

      const newAccount: AccountModel = { ...insertedAccount, dispositivos };
      
      return newAccount;
    } catch (err) {
      console.log(err);
      throw "Erro no banco de dados !";
    }
  }
}
