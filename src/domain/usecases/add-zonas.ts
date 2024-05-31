import { ZonasModel } from '../models/zonas'

export interface AddZonaModel {
    id: number 
    nome: string
}

export interface AddZonas {
    add (zona: AddZonaModel): Promise<ZonasModel>
}