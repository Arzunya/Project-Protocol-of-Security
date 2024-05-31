import { AddZonaModel, ZonasModel } from '../../presentention/controllers/zonas/zona-protocols'

export interface AddZonaRepository {
    add (Zona: AddZonaModel): Promise<ZonasModel>
    
}