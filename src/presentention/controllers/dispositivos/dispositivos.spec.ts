import {expect, describe, test, vi} from "vitest";
import { MissingParamError, ServerError } from "../../errors";
import { AddDispositivos, AddDispositivosModel, DispositivosModel } from "./dispositivos-protocols";
import { DispositivosController } from "./dispositivos";

interface SutTypes {
    sut: DispositivosController;
    addDispsositivosStub: AddDispositivos;
}

const makeAddDispositivos = (): AddDispositivos => {
    class addDispsositivosStub implements AddDispositivos {
        async add(aparelho: AddDispositivosModel): Promise<DispositivosModel> {
            const fakeDispositivos = {
                n_serial: "valid_nserial",
                ip: "valid_ip"
            };
            return new Promise(resolve => resolve(fakeDispositivos));
        }
    }
    return new addDispsositivosStub();
};

const makeSut = (): SutTypes => {
    const addDispsositivosStub = makeAddDispositivos();
    const sut = new DispositivosController(addDispsositivosStub);
    return {
        sut, 
        addDispsositivosStub
    };
};

describe("Dispositivo Controller", () => {
    test ("Deve retornar 400 se nenhum número de serial for fornecido", async () => {
        const { sut } = makeSut()
        const httpResquest = {
            body: {
                n_serial: "any_nserial",
                
            }
        }
        const httpResponse = await sut.handle(httpResquest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError("Nserial"))
        
    })

    test ("Deve retornar 400 se nenhum ip for fornecido", async () => {
        const { sut } = makeSut()
        const httpResquest = {
            body: {
                ip: "any_ip"              
                
                
            }
        }
        const httpResponse = await sut.handle(httpResquest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError("Ip"))
        
    }) 

    test ("Deve chamar AddDispositivos com os valores corretos", async () => {
        const { sut, addDispsositivosStub} = makeSut()
        const addSpy = vi.spyOn(addDispsositivosStub, "add")
        const httpResquest = {
            body: {
                n_serial: "any_nserial",
                ip: "any_ip"
                
                  
            }
        }
        await sut.handle(httpResquest)
        expect(addSpy).toHaveBeenCalledWith({
            n_serial: "any_nserial",
            ip: "any_ip"

        })
        
    })

    test ("Deve retornar 500 se AddDispositivos voltar uma excessão ", async () => {
        const { sut, addDispsositivosStub } = makeSut()
        vi.spyOn(addDispsositivosStub, "add").mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })
        const httpResquest = {
            body: {
                n_serial: "any_nserial",
                ip: "any_ip"
                
                
                  
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
                n_serial: "valid_nserial",
                ip: "valid_ip"
            }
        }
        const httpResponse = await sut.handle(httpResquest)
        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual({
            n_serial: "valid_nserial",
            ip: "valid_ip"

        })
        
    })

})