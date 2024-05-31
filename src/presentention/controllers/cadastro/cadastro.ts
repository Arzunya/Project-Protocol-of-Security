import { HttpResponse, HttpRequest, Controller, AddAccount } from "./cadastro-protocols";
import { MissingParamError } from "../../errors";
import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { IntelbrasDepositoBase } from "@infra/intelbras/controllers/user/add-user";
import { z } from "zod";
import { PrismaClient } from '@prisma/client'; 

const prisma = new PrismaClient(); 

export class CadastroController implements Controller {
  private readonly addAccount: AddAccount;

  constructor(addAccount: AddAccount) {
    this.addAccount = addAccount;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const {
      matricula,
      nome,
      senha,
      setor,
      documento,
      responsavel,
      veiculo,
      email,
      observacoes,
      situacaoCadastro,
      empresa,
      nivel_usuario,
      PhotoData,
      acessos,
      tipo,
      status,
      ValidFrom,
      ValidTo,
      
    } = httpRequest.body;

    const Testing = z.object({
      matricula: z.string({ required_error: "Preencher matrícula !" }).min(1, "Preencher matrícula !").trim(),
      nome: z.string({ required_error: "Preencher Nome !" }).min(1, "Preencher Nome !").trim(),
      senha: z.string({ required_error: "Preencher Senha !" }).min(1, "Preencher Senha !").trim(),
      ValidFrom: z.string({ required_error: "Preencher ValidFrom !" }).min(1, "Preencher ValidFrom !").trim(),
      ValidTo: z.string({ required_error: "Preencher ValidTo !" }).min(1, "Preencher ValidTo !").trim(),


      PhotoData: z
        .string({ required_error: "Foto não encontrada !" })
        .min(1, "Formato não validado !")
        .base64("Formato não validado !"),
    });

    const state = Testing.safeParse({ matricula, nome, senha, PhotoData, ValidFrom, ValidTo });

    if (!state.success) {
      throw state.error.issues[0].message;
    }

    const account = await this.addAccount.add({
      matricula,
      nome,
      senha,
      setor,
      documento,
      responsavel,
      veiculo,
      email,
      observacoes,
      situacaoCadastro,
      empresa,
      nivel_usuario,
      PhotoData,
      acessos,
      status,
      tipo,
      ValidFrom,
      ValidTo
    });

    const tipoPerfil = new IntelbrasDepositoBase();

    const dispositivosCadastrados: string[] = [];
    let errorMessage = '';

    if (account.dispositivos) {
      await Promise.all(
        account.dispositivos.map(async (dispositivo_acesso) => {
          try {
            const timeoutMs = 5000;
            const addPromise = tipoPerfil.add({
              UserName: account.nome,
              Password: account.senha,
              UserID: String(account.id),
              ip: dispositivo_acesso.ip,
              PhotoData,
              ValidFrom,
              ValidTo
            });

            const addResult = await Promise.race([
              addPromise,
              new Promise((resolve) => setTimeout(resolve, timeoutMs, 'timeout')),
            ]);

            if (addResult === 'timeout') {
              errorMessage = `Falha ao cadastrar usuário no dispositivo ${dispositivo_acesso.ip}. ID do usuário: ${account.id}`;
              await prisma.notificacao.create({
                data: {
                  dispositivo: dispositivo_acesso.ip,
                  UserID: account.id,
                  alerta: errorMessage,
                },
              });
            } else {
              console.log(`${dispositivo_acesso.ip} ${addResult}`);
              dispositivo_acesso.ip;

              if (addResult) {
                dispositivosCadastrados.push(`${dispositivo_acesso.ip} (Usuário ID: ${account.id})`);
              } else {
                errorMessage = `Falha ao cadastrar usuário no dispositivo ${dispositivo_acesso.ip}. ID do usuário: ${account.id}`;
                await prisma.notificacao.create({
                  data: {
                    dispositivo: dispositivo_acesso.ip,
                    UserID: account.id,
                    alerta: errorMessage,
                  },
                });
              }
            }
          } catch (error) {
            console.error(error);
          }
        }),
      );
    }

    return ok({ errorMessage, dispositivosCadastrados, account });
  }
}

