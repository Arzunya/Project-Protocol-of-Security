import { Controller, HttpRequest, HttpResponse } from '../../presentention/protocols';


export class LogZonaControllerDecorator implements Controller {
    private readonly controller: Controller

    constructor (controller: Controller) {
        this.controller = controller
    } 
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse = await this.controller.handle(httpRequest)
        return httpResponse  
    }
        
    
}