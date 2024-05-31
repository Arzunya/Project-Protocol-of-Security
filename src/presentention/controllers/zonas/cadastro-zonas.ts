import { HttpResponse, HttpRequest, Controller, AddZonas } from "./zona-protocols";
import { MissingParamError } from "../../errors";
import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { z } from "zod" 

export class ZonaController implements Controller {
    private readonly addZonas: AddZonas;

    constructor(addZonas: AddZonas) {
        this.addZonas = addZonas;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        
        const { nome, id } = httpRequest.body;

        const Testing = z.object({
            nome: z.string({ required_error: "Parametro de nome não fornecido" }).min(1, "Preencha o campo!").trim(),
            
          });
      
          const state = Testing.safeParse({ nome });
      
          if (!state.success) {
            throw state.error.issues[0].message;
          }

        const zona = await this.addZonas.add({
            nome,
            id
        });

        return ok(zona); 
    }
}
