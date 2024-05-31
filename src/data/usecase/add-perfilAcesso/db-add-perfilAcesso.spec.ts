import { describe, test, expect, vi } from "vitest"
import { AddPerfilAcessoModel, PerfilAcessoModel, AddPerfilAcesso} from "../../../presentention/controllers/cadastro-perfilAcesso/cadastro-perfilAcesso-protocols"
import { DbAddPerfilAcesso } from "./db-add-perfilAcesso"
import { AddPerfilAcessoRepository } from "../../protocols/add-perfilAcesso-repository"

const makeAddPerfilAcessoRepository = (): AddPerfilAcessoRepository => {
    class AddPerfilAcessoStub implements AddPerfilAcessoRepository {
        async add(perfilData: AddPerfilAcessoModel): Promise<PerfilAcessoModel> {
            const fakeAcesso = {
                nivel: "valid_nivel",
                dispositivos: "valid_dispositivos"
            }
            return new Promise(resolve => resolve(fakeAcesso))
        }
    }
    return new AddPerfilAcessoStub()
}

interface SutTypes {
    sut: DbAddPerfilAcesso
    addPerfilAcessoStub: AddPerfilAcessoRepository
    
}

const makeSut = (): SutTypes => {
    const addPerfilAcessoStub = makeAddPerfilAcessoRepository()
    const sut = new DbAddPerfilAcesso(addPerfilAcessoStub)
    return {
        sut,
        addPerfilAcessoStub
    }
}

describe("DbAddPerfilAcesso Usecase", () => {
    test("Deve chamar AddPerfilAcesso com os valores corretos", async () => {
        const { sut, addPerfilAcessoStub } = makeSut()
        const addSpy = vi.spyOn(addPerfilAcessoStub, "add")
        const PerfilAcessoData = {
            nivel: "valid_nivel",
            dispositivos: "valid_dispositivos"
        }
        await sut.add(PerfilAcessoData)
        expect(addSpy).toHaveBeenCalledWith({
            nivel: "valid_nivel",
            dispositivos: "valid_dispositivos"
        })
    })

    test("Deve retornar um Perfil de Acesso em caso de sucesso", async () => {
        const { sut } = makeSut()
        const PerfilAcessoData = { 
            nivel: "valid_nivel",
            dispositivos: "valid_dispositivos"
        }
        const perfilAcesso = await sut.add(PerfilAcessoData)
        expect(perfilAcesso).toEqual({
            nivel: "valid_nivel",
            dispositivos: "valid_dispositivos"
        })
    })
})