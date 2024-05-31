import { describe, test, expect, vi } from "vitest"
import { CadastroController } from "./cadastro"
import { MissingParamError, ServerError } from "../../errors"
import { AddAccount, AddAccountModel, AccountModel } from "./cadastro-protocols"


interface SutTypes {
    sut: CadastroController
    
    addAccountStub: AddAccount

}


const makeAddAccount = (): AddAccount => {
    class AddAccountStub implements AddAccount{
        async add (account: AddAccountModel): Promise<AccountModel> {
            const fakeAccount = {
                id: "valid_id",
                nome: "valid_nome",
                senha: "valid_senha",
                setor: "valid_setor",
                nivelAcesso: "valid_nivelAcesso"
            }
            return new Promise(resolve => resolve (fakeAccount))
        }
    }
    return new AddAccountStub()
}


const makeSut = (): SutTypes => {
    
    
    const addAccountStub = makeAddAccount()
    const sut = new CadastroController(addAccountStub)
    return {
        sut,
        addAccountStub
    }
}

describe("Cadastro Controller", () => {
    test ("Deve retornar 400 se nenhum nome for fornecido", async () => {
        const { sut } = makeSut()
        const httpResquest = {
            body: {
                id: "any_id",
                senha: "any_senha",
                setor: "any_setor",
                nivelAcesso: "valid_nivelAcesso"

                 
            }
        }
        const httpResponse = await sut.handle(httpResquest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError("Nome"))
        
    })

    test ("Deve retornar 400 se nenhum id for fornecido", async () => {
        const { sut } = makeSut()
        const httpResquest = {
            body: {
                nome: "any_nome",
                senha: "any_senha",
                setor: "any_setor",
                nivelAcesso: "valid_nivelAcesso"
           
                
                
            }
        }
        const httpResponse = await sut.handle(httpResquest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError("id"))
        
    }) 

    test ("Deve retornar 400 se nenhum setor for fornecido", async () => {
        const { sut } = makeSut()
        const httpResquest = {
            body: {
                id: "any_id",
                nome: "any_nome",
                senha: "any_senha",
                nivelAcesso: "valid_nivelAcesso"

                       
            }
        }
        const httpResponse = await sut.handle(httpResquest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError("perfilAcesso"))
        
    })
 
    

    

    test ("Deve retornar 400 se nenhuma senha for fornecida", async () => {
        const { sut } = makeSut()
        const httpResquest = {
            body: {
                id: "any_id",
                nome: "any_nome",
                setor: "any_setor",
                nivelAcesso: "valid_nivelAcesso"

                       
            }
        }
        const httpResponse = await sut.handle(httpResquest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError("senha"))
        
    })

    test ("Deve chamar AddAccount com os valores corretos", async () => {
        const { sut, addAccountStub } = makeSut()
        const addSpy = vi.spyOn(addAccountStub, "add")
        const httpResquest = {
            body: {
                id: "any_id",
                nome: "any_nome",
                senha: "any_senha",
                setor: "any_setor",
                nivelAcesso: "valid_nivelAcesso"

                
                  
            }
        }
        await sut.handle(httpResquest)
        expect(addSpy).toHaveBeenCalledWith({
            id: "any_id",
            nome: "any_nome",
            senha: "any_senha",
            setor: "any_setor",
            nivelAcesso: "valid_nivelAcesso"


        })
        
    })

    test ("Deve retornar 500 se AddAccount voltar uma excessão ", async () => {
        const { sut, addAccountStub } = makeSut()
        vi.spyOn(addAccountStub, "add").mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })
        const httpResquest = {
            body: {
                id: "any_id",
                nome: "any_nome",
                senha: "any_senha",
                setor: "any_setor",
                nivelAcesso: "valid_nivelAcesso"

                
                
                  
            }
        }
        const httpResponse = await sut.handle(httpResquest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError)
        
    })

    test ("Deve retornar 200 se dados validos forem fornecidos", async () => {
        const { sut } = makeSut()
        const httpResquest = {
            body: {
                id: "valid_id",
                nome: "valid_nome",
                senha: "valid_senha",
                setor: "valid_setor",
                nivelAcesso: "valid_nivelAcesso"

            }
        }
        const httpResponse = await sut.handle(httpResquest)
        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual({
            id: "valid_id",
            nome: "valid_nome",
            senha: "valid_senha",
            setor: "valid_setor",
            nivelAcesso: "valid_nivelAcesso"


        })
        
    })

})

function reject(resolve: (value: AccountModel | PromiseLike<AccountModel>) => void, reject: (reason?: any) => void): void {
    throw new Error("Function not implemented.")
}
