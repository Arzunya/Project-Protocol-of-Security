import { HttpResponse, HttpRequest, Controller, AddDispositivos } from "./dispositivos-protocols";
import { MissingParamError } from "../../errors";
import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { z } from "zod";
export class DispositivosController implements Controller {
  private readonly addDispositivos: AddDispositivos;

  constructor(addDispositivos: AddDispositivos) {
    this.addDispositivos = addDispositivos;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id, nome, n_serial, ip, zonaId, zona, mac, funcionalidade  } = httpRequest.body;

    const Testing = z.object({
      nome: z.string({ required_error: "Forneça o parametro de nome" }).min(1, "Preencha o nome").trim(),
      n_serial: z.string({ required_error: "Forneça o parametro de serial" }).min(1, "Preencha o serial").trim(),
      ip: z
        .string({ required_error: "Forneça o parametro de ip" })
        .min(1, "Preencha o ip")
        .ip({ message: "Parâmetro IP não compatível" })
        .trim(),
      zonaId: z.number({ required_error: "Forneça o parametro de zonaID" }).min(1, "Preencher Senha !"),
      mac: z.string({ required_error: "Forneça o parametro de mac" }).min(1, "Preencha o mac").trim(),
      funcionalidade: z.number({ required_error: "Forneça o parametro de funcionalidade" }).min(1, "Preencha a funcionalidade"),


    });

    const state = Testing.safeParse({ nome, n_serial, ip, zonaId, mac, funcionalidade });

    if (!state.success) {
      throw state.error.issues[0].message;
    }

    const aparelho = await this.addDispositivos.add({
      id,
      nome,
      n_serial,
      ip,
      zonaId,
      zona,
      mac,
      funcionalidade
    });
    return ok(aparelho);
  }
}
