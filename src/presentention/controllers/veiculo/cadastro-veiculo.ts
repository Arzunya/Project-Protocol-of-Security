import { HttpResponse, HttpRequest, Controller, AddVeiculos } from "./veiculo-protocols";
import { MissingParamError } from "../../errors";
import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { z } from "zod" 

export class VeiculoController implements Controller {
    private readonly addVeiculos: AddVeiculos;

    constructor(addVeiculos: AddVeiculos) {
        this.addVeiculos = addVeiculos;
    }


    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        
        const { id, marca, modelo, cor, placa } = httpRequest.body;

        const Testing = z.object({
            id: z.number({ required_error: "Parametro do id não fornecido" }).min(1, "Preencha o campo!"),
            marca: z.string({ required_error: "Parametro de marca não fornecido" }).min(1, "Preencha o campo!").trim(),
            modelo: z.string({ required_error: "Parametro de modelo não fornecido" }).min(1, "Preencha o campo!").trim(),
            cor: z.string({ required_error: "Parametro de cor não fornecido" }).min(1, "Preencha o campo!").trim(),
            placa: z.string({ required_error: "Parametro de placa não fornecido" }).min(1, "Preencha o campo!").trim(),

            
          });
      
          const state = Testing.safeParse({ id, marca, modelo, cor, placa });
      
          if (!state.success) {
            throw state.error.issues[0].message;
          }

        const veiculo = await this.addVeiculos.add({
            id,
            marca, 
            modelo,
            cor,
            placa
        });

        return ok(veiculo); 
         
    }
}
