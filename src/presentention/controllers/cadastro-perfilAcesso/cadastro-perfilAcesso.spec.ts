import { expect, describe, test, vi } from "vitest";
import { MissingParamError, ServerError } from "../../errors";
import { AddPerfilAcesso, AddPerfilAcessoModel, PerfilAcessoModel } from "./cadastro-perfilAcesso-protocols";
import { CadastroPerfilAcessoController } from "./cadastro-perfilAcesso";

interface SutTypes {
    sut: CadastroPerfilAcessoController;
    addPerfilAcessoStub: AddPerfilAcesso;
}

const makeAddPerfilAcesso = (): AddPerfilAcesso => {
    class AddPerfilAcessoStub implements AddPerfilAcesso {
        async add(perfil: AddPerfilAcessoModel): Promise<PerfilAcessoModel> {
            const fakeTipoAcesso = {
                nivel: "valid_nivel",
                dispositivos: "valid_dispositivos"
            };
            return new Promise(resolve => resolve(fakeTipoAcesso));
        }
    }
    return new AddPerfilAcessoStub();
};

const makeSut = (): SutTypes => {
    const addPerfilAcessoStub = makeAddPerfilAcesso();
    const sut = new CadastroPerfilAcessoController(addPerfilAcessoStub);
    return {
        sut,
        addPerfilAcessoStub
    };
};

describe("Perfil Acesso Controller", () => {
    test ("Deve retornar 400 se nenhum dispositivo for fornecido", async () => {
        const { sut } = makeSut()
        const httpResquest = {
            body: {
                nivel: "any_nivel",
                
            }
        }
        const httpResponse = await sut.handle(httpResquest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError("Dispositivo"))
        
    })

    test ("Deve retornar 400 se nenhum nivel de acesso for fornecido", async () => {
        const { sut } = makeSut()
        const httpResquest = {
            body: {
                dispositivos: "any_dispositivos"              
                
                
            }
        }
        const httpResponse = await sut.handle(httpResquest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError("Dispositivo"))
        
    }) 

    test ("Deve chamar AddAccount com os valores corretos", async () => {
        const { sut, addPerfilAcessoStub} = makeSut()
        const addSpy = vi.spyOn(addPerfilAcessoStub, "add")
        const httpResquest = {
            body: {
                nivel: "any_nivel",
                dispositivos: "any_dispositivos"
                
                  
            }
        }
        await sut.handle(httpResquest)
        expect(addSpy).toHaveBeenCalledWith({
            nivel: "any_nivel",
            dispositivos: "any_dispositivos"

        })
        
    })

    test ("Deve retornar 500 se AddAccount voltar uma excessão ", async () => {
        const { sut, addPerfilAcessoStub } = makeSut()
        vi.spyOn(addPerfilAcessoStub, "add").mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })
        const httpResquest = {
            body: {
                nivel: "any_nivel",
                dispositivos: "any_dispositivos"
                
                
                  
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
                nivel: "valid_nivel",
                dispositivos: "valid_dispositivos"
            }
        }
        const httpResponse = await sut.handle(httpResquest)
        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual({
            nivel: "valid_nivel",
            dispositivos: "valid_dispositivos"

        })
        
    })

})