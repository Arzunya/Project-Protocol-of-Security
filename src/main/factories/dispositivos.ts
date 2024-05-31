import { DispositivosController } from "../../presentention/controllers/dispositivos/dispositivos";
import { DbaDispositivos } from "../../data/usecase/add-dispositivos/db-add-dispositivos"
import { DispositivosPosgresRepository } from "../../infra/db/postgresdb/dispositivos-respository/dispositivos"
import { LogControllerDecorator } from "../decorators/log"
import { Controller } from "../../presentention/protocols";

export const makeDispositivosController = (): Controller => {
    
    const dispositivosPosgresRepository = new DispositivosPosgresRepository()
    const dbaDispositivos = new DbaDispositivos(dispositivosPosgresRepository)
    const dispositivosController = new DispositivosController(dbaDispositivos)
    return new LogControllerDecorator(dispositivosController)
}
