import { DispositivosModel }  from "../models/dipositivos"

export interface AddDispositivosModel {
    id: number
    nome: string
    n_serial: string
    ip: string
    zonaId: number
    zona: string
    mac: string
    funcionalidade: number
    
}

export interface AddDispositivos {
    add (dispositivos: AddDispositivosModel): Promise<DispositivosModel>
}
