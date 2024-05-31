import { VeiculoController } from "../../presentention/controllers/log/veiculo";
import { Controller } from "../../presentention/protocols";
import { LogControllerDecorator } from "../decorators/log";

export const makeLogVeiculoController = (): Controller => {
    const dispositivosController = new VeiculoController();
    return new LogControllerDecorator(dispositivosController);
};