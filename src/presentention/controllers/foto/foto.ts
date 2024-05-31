import { HttpResponse, HttpRequest, Controller, GetFoto } from "./foto-protocols";
import { MissingParamError } from "../../errors";
import { badRequest, serverError, ok, okFoto } from "../../helpers/http-helper";
import { IntelbrasFoto } from "@infra/intelbras/controllers/user/foto";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TirarFotoController implements Controller {
  private readonly getFoto?: GetFoto;

  constructor(getFoto?: GetFoto) {
    this.getFoto = getFoto;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.body;

    if (!id) {
      throw ("ID não fornecido");
    }

    const dispositivo = await prisma.dispositivo.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        ip: true,
      },
    });

    if (!dispositivo || !dispositivo.ip) {
      throw ("Dispositivo não encontrado");
    }

    const ip = dispositivo.ip; 

    
    const apiFoto = new IntelbrasFoto();
    const sucesso = await apiFoto.get(ip);

    if (sucesso) {
      return okFoto(Buffer.from(sucesso), "jpg");
    } else {
      return serverError("Erro ao tirar foto");
    }
  }
}
