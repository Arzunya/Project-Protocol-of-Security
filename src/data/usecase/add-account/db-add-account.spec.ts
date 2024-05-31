import { describe, test, expect, vi } from "vitest"
import { AccountModel, AddAccount, AddAccountModel } from "../../../presentention/controllers/cadastro/cadastro-protocols"
import { DbAddAccount } from "./db-add-account"
import { AddAccountRepository } from "../../protocols/add-account-repository"


const makeAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository {
        async add (accountData: AddAccountModel): Promise<AccountModel> {
            const fakeAccount =  {
                id: "valid_id",
                nome: "valid_nome",
                senha: "valid_senha",
                setor: "valid_setor"
            }
            return new Promise(resolve => resolve(fakeAccount))
        }
    }
    return new AddAccountRepositoryStub()
}

interface SutTypes {
    sut: DbAddAccount
    addAccountRepositoryStub: AddAccountRepository

}

const makeSut = (): SutTypes => {
    const addAccountRepositoryStub = makeAddAccountRepository()
    const sut = new DbAddAccount(addAccountRepositoryStub)
    return {
        sut,
        addAccountRepositoryStub

    }
}

describe("DbAddAccount Usecase", () => {
    test("Deve chamar AddAccountRepository com os valores corretos", async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        const addSpy = vi.spyOn(addAccountRepositoryStub, "add")
        const accountData = {
            id: "valid_id",
            nome: "valid_nome",
            senha: "valid_senha",
            setor: "valid_setor"
        }
        await sut.add(accountData)
        expect(addSpy).toHaveBeenCalledWith({
            id: "valid_id",
            nome: "valid_nome",
            senha: "valid_senha",
            setor: "valid_setor"

        })  
    })

    test('Deve retornar uma conta em caso de sucesso', async () => {
    
        const { sut } = makeSut()
        const accountData = {
            id: "valid_id",
            nome: "valid_nome",
            senha: "valid_senha",
            setor: "valid_setor"

            
        }
        const account = await sut.add(accountData)
        expect(account).toEqual({
            id: "valid_id",
            nome: "valid_nome",
            senha: "valid_senha",
            setor: "valid_setor"

        })
            
        
    })
})