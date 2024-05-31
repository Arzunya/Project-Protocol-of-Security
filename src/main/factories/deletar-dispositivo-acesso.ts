import { Controller } from "../../presentention/protocols";
import { DeletarDispoAcessoController } from '../../presentention/controllers/deletarDispositivo/deletarDispoAcesso'
import { DeletePerfilAcessoControllerDecorator } from '../decorators/deletarPerfilAcesso'
import { DelDispoAcessoPostgreRepository } from '../../infra/db/postgresdb/perfilAcesso-repository/deletarDispoAcesso'
import { DbDelDispoAcesso } from '../../data/usecase/add-perfilAcesso/db-del-dispoAcesso'
import { IntelbrasDeletarUsuario } from "./../../infra/intelbras/controllers/user/del-user";
import { Prisma } from "@prisma/client";

export const makeDeletarDispoAcessoController = (): Controller => {

    const delDispoAcessoPostgreRepository = new DelDispoAcessoPostgreRepository()
    const dbDelDispoAcesso = new DbDelDispoAcesso(delDispoAcessoPostgreRepository)
    const intelbrasDeletarUsuario = new IntelbrasDeletarUsuario();
    const deletarDispoAcessoController = new DeletarDispoAcessoController(dbDelDispoAcesso, intelbrasDeletarUsuario) 
    return new DeletePerfilAcessoControllerDecorator(deletarDispoAcessoController)
}
