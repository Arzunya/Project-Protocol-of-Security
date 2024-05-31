import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { ok } from "../../helpers/http-helper";
import { getVeiculo } from "@infra/db/postgresdb/log-repository/exibir-veiculo";
import veiculo from "../../../main/routes/veiculo";

export class VeiculoController implements Controller {
  
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      
      const veiculo = await getVeiculo();
  
      return ok(veiculo);
      
    }
  }
  