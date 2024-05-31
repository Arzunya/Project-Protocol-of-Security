import { HttpResponse, HttpRequest, Controller, AddPerfilAcesso } from "./cadastro-perfilAcesso-protocols";
import { MissingParamError } from "../../errors";
import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

export class CadastroPerfilAcessoController implements Controller {
  private readonly addPerfilAcesso: AddPerfilAcesso;
  private prisma: PrismaClient;

  constructor(addPerfilAcesso: AddPerfilAcesso) {
    this.addPerfilAcesso = addPerfilAcesso;
    this.prisma = new PrismaClient({ log: ["info", "query", "warn"] });
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { nivel, dispositivos, id } = httpRequest.body;

    const schema = z.object({
      nivel: z.string({ required_error: "Forneça o parâmetro de nível" }).min(1, "Preencha o nível").trim(),
    });

    const validationResult = schema.safeParse({ nivel });

    if (!validationResult.success) {
      throw validationResult.error.issues[0].message;
    }

    if (!dispositivos) {
      throw "Forneça o campo dos dispositivos";
    }

    if (dispositivos.length == 0) {
      throw "Forneça pelo menos um dispositivo";
    }

    const nivelExistente = await this.prisma.acesso.findFirst({
      where: {
        nivel,
      },
    });

    if (nivelExistente) {
      throw "Já existe um nível de acesso com esse nome !";
    }

    const perfil = await this.addPerfilAcesso.add({
      id,
      nivel,
      dispositivos,
    });

    return ok(perfil);
  }
}
