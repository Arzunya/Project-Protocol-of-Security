import { AddDispositivos, DispositivosModel } from "../../presentention/controllers/dispositivos/dispositivos-protocols"

export interface AddDispositivosRepository {
    add (dispositivosData: DispositivosModel): Promise<DispositivosModel>
}