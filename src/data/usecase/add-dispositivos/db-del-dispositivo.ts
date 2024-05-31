import { DelDispositivo, DelDispositivoModel } from '../../../domain/usecases/del-dispositivo'
import { HttpResponse } from '../../../presentention/protocols'
import { DelDispositivoRepository } from '../../protocols/del-dispositivo-repository'

export class DbDelDispositivo implements DelDispositivo {
    private readonly delDispositivoRepository: DelDispositivoRepository

    constructor(delDispositivoRepository: DelDispositivoRepository) {
        this.delDispositivoRepository = delDispositivoRepository
    }

    async del(dispositivoDel: DelDispositivoModel): Promise<HttpResponse> {
        const dispositivo = await this.delDispositivoRepository.del(Object.assign({}, dispositivoDel))
        return dispositivo
    }

}

