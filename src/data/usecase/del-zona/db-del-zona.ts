import { DelZona, DelZonaModel } from '../../../domain/usecases/del-zona'
import { HttpResponse } from '../../../presentention/protocols'
import { DelZonaRepository } from '../../protocols/del-zona-repository'

export class DbDelZona implements DelZona {
    private readonly delZonaRepository: DelZonaRepository

    constructor(delZonaRepository: DelZonaRepository) {
        this.delZonaRepository = delZonaRepository
    }

    async del(accountDel: DelZonaModel): Promise<HttpResponse> {
        const zona = await this.delZonaRepository.del(Object.assign({}, accountDel))
        return zona
    }

}

