import { AddZonas, AddZonaModel } from "../../../domain/usecases/add-zonas"
import { ZonasModel } from "../../../domain/models/zonas"
import { AddZonaRepository } from "../../protocols/add-zona-repository"

export class DbAddZona implements AddZonas {
    private readonly addZonaRepository: AddZonaRepository

    constructor(addZonaRepository: AddZonaRepository) {
        this.addZonaRepository = addZonaRepository
    }

    async add(zona: AddZonaModel): Promise<ZonasModel> {
        const zonas = await this.addZonaRepository.add(Object.assign({}, zona))
        return zonas
        
    }
}