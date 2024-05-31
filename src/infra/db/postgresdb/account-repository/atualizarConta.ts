import { PrismaClient, usuario, acesso_usuario, dispositivo_acesso } from "@prisma/client";
import { AttAccountRepository } from "../../../../data/protocols/att-account-repository";
import { AttAccountModel } from "../../../../domain/usecases/alterar-account";
import { AltAccountModel } from "../../../../domain/models/alterar-conta";
import { IntelbrasDeletarUsuario } from "../../../intelbras/controllers/user/del-user";
import { IntelbrasDepositoBase } from "../../../intelbras/controllers/user/add-user";

export class AltAccountPostgreRepository implements AttAccountRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({ log: ["info", "query", "warn"] });
  }

  async alt(accountData: AttAccountModel): Promise<AltAccountModel> {
    console.log("Dados da conta recebidos:", accountData);

    const updatedUsuario = await this.prisma.usuario.update({
      where: { id: accountData.id },
      data: {
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
        status: accountData.status,
        ValidFrom: accountData.ValidFrom,
        ValidTo: accountData.ValidTo
      },
    });

    const intelbrasDepositoBase = new IntelbrasDepositoBase();
    const intelbrasDeletarUsuario = new IntelbrasDeletarUsuario();

    const usuarioInfo = await this.prisma.usuario.findUnique({
      where: { id: accountData.id },
      select: {
        nome: true,
        senha: true,
        PhotoData: true,
        ValidFrom: true,
        ValidTo: true
      },
    });

    if (!usuarioInfo) {
      throw (`Usuário com ID: ${accountData.id} não encontrado.`);
    }

    const niveis = await this.prisma.acesso_usuario.findMany({
      where: { usuario_id: accountData.id },
      select: { nivel_usuario: true },
    });

    const niveisIds = niveis.map(nivel => nivel.nivel_usuario);

    const dispositivos = await this.prisma.dispositivo_acesso.findMany({
      where: {
        nivelId: {
          in: niveisIds,
        },
      },
      include: {
        dispositivo: true,
      },
    });

    const ipDispositivos: string[] = dispositivos.map(d => d.dispositivo.ip).filter(ip => ip !== null) as string[];

    for (const ip of ipDispositivos) {
      if (ip) {
        console.log(`Removendo usuario de ID: ${accountData.id} do dispositivo de IP: ${ip}`);
        const deleteSuccess = await intelbrasDeletarUsuario.del({ UserID: accountData.id, ip });
        if (!deleteSuccess) {
          const errorMessage = `Falha ao remover o usuário ID ${accountData.id} na API externa para o IP ${ip}`;
          console.error(errorMessage);
          await this.prisma.notificacao.create({
            data: {
              dispositivo: ip,
              UserID: accountData.id,
              alerta: errorMessage,
            },
          });
          throw (errorMessage); 
        }

        console.log(`Adicionando usuario de ID: ${accountData.id} ao dispositivo com IP: ${ip}`);
        const addSuccess = await intelbrasDepositoBase.add({
          UserName: usuarioInfo.nome!,
          UserID: String(accountData.id),
          Password: usuarioInfo.senha!,
          ip,
          PhotoData: usuarioInfo.PhotoData!,
          ValidFrom: usuarioInfo.ValidFrom!,
          ValidTo: usuarioInfo.ValidTo!
        });

        if (!addSuccess) {
          const errorMessage = `Falha ao adicionar o usuário ID ${accountData.id} na API externa para o IP ${ip}`;
          console.error(errorMessage);
          await this.prisma.notificacao.create({
            data: {
              dispositivo: ip,
              UserID: accountData.id,
              alerta: errorMessage,
            },
          });
          throw (errorMessage); 
        }
      }
    }

    const altAccount: AltAccountModel = {
      id: accountData.id,
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
      status: accountData.status,
      nivel_usuario: accountData.nivel_usuario,
      ValidFrom: accountData.ValidFrom,
      ValidTo: accountData.ValidTo
    };

    console.log("Conta atualizada com sucesso:", altAccount);
    return altAccount;
  }
}
