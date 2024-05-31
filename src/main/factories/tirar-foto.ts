import { FotoControllerDecorator } from "../decorators/foto";
import { Controller } from "../../presentention/protocols";
import { TirarFotoController } from "../../presentention/controllers/foto/foto";
import { DbaFotos } from "../../data/usecase/add-dispositivos/db-get-fotos"


export const makeTirarFotoController = (): Controller => { 
    
    const tirarFotoController = new TirarFotoController();
    return new FotoControllerDecorator(tirarFotoController);
};
