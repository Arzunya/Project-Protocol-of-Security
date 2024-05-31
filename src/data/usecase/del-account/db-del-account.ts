import { DelAccount, DelAccountModel } from '../../../domain/usecases/del-account'
import { HttpResponse } from '../../../presentention/protocols'
import { DelAccountRepository } from '../../protocols/del-account-repository'

export class DbDelAccount implements DelAccount {
    private readonly delDispositivoRepository: DelAccountRepository

    constructor(delDispositivoRepository: DelAccountRepository) {
        this.delDispositivoRepository = delDispositivoRepository
    }

    async del(accountDel: DelAccountModel): Promise<HttpResponse> {
        const dispositivo = await this.delDispositivoRepository.del(Object.assign({}, accountDel))
        return dispositivo
    }

}

