import { describe, test, expect, vi } from "vitest";
import { AddDispositivosModel, DispositivosModel } from "../../../presentention/controllers/dispositivos/dispositivos-protocols"
import { DbaDispositivos } from "./db-add-dispositivos"
import { AddDispositivosRepository } from "../../protocols/add-dispositivo-repository"

const makeDispositivosRepository = (): AddDispositivosRepository => {
    class AddDispositivosStub implements AddDispositivosRepository {
        async add(dispositivosData: DispositivosModel): Promise<DispositivosModel> {
            const fakeDispsoitivos = {
                n_serial: "valid_n_serial",
                ip: "valid_ip"
            }
            return new Promise(resolve => resolve(fakeDispsoitivos))
        }
    }
    return new AddDispositivosStub()
}

interface SutTypes{
    sut: DbaDispositivos
    addDispositivosStub: AddDispositivosRepository
}

const makeSut = (): SutTypes => {
    const addDispositivosStub = makeDispositivosRepository()
    const sut = new DbaDispositivos(addDispositivosStub)
    return {
        sut, 
        addDispositivosStub
    }
}   

describe("DbAddDispositivos Usecase", () => {
    test("Deve chamar AddDispositivos com os valores corretos", async () => {
        const { sut, addDispositivosStub } = makeSut()
        const addSpy = vi.spyOn(addDispositivosStub, "add")
        const DispositivosData = {
            n_serial: "valid_n_serial",
            ip: "valid_ip"
        }
        await sut.add(DispositivosData)
        expect(addSpy).toHaveBeenCalledWith({
            n_serial: "valid_n_serial",
            ip: "valid_ip"
        })
    })

    test("Deve retornar um Dispositivo de Acesso em caso de sucesso", async () => {
        const { sut } = makeSut()
        const DispositivosData = { 
            n_serial: "valid_n_serial",
            ip: "valid_ip"
        }
        const aparelho = await sut.add(DispositivosData)
        expect(aparelho).toEqual({
            n_serial: "valid_n_serial",
            ip: "valid_ip"
        })
    })
})