import { describe, test, expect, vi } from "vitest";
import { Controller, HttpRequest, HttpResponse } from '../../presentention/protocols';
import { LogControllerDecorator } from './log';

interface SutTypes {
    sut: LogControllerDecorator
    controllerStub: Controller
}

const makeController = (): Controller => {
    class ControllerStub implements Controller {
        async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
            const httpResponse: HttpResponse = {
                statusCode: 200,
                body: {
                    name: 'Rodrigo'
                }
            };
            return new Promise(resolve => resolve(httpResponse));
        }
    }

    return new ControllerStub();

}

const makeSut = (): SutTypes => {
    const controllerStub = makeController();
    const sut = new LogControllerDecorator(controllerStub);
    return {
        sut,
        controllerStub
    }


}
describe('LogController Decorator', () => {
    test('Should call controller handle', async () => {  
        const { sut, controllerStub } = makeSut()
        const handleSpy = vi.spyOn(controllerStub, 'handle');
        const httpRequest = {
            body: {
                id: "any_id",
                nome: "any_nome",
                senha: "any_senha",
            }
        }

        await sut.handle(httpRequest);
        
        expect(handleSpy).toHaveBeenCalledWith(httpRequest);
    })

    test('Should return the same result of the controller', async () => {  
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                id: "any_id",
                nome: "any_nome",
                senha: "any_senha",
            }
        };

        const httpResponse = await sut.handle(httpRequest);
        
        expect(httpResponse).toEqual({
            statusCode: 200,
            body: {
                name: 'Rodrigo'
            }
        })
    })

})
