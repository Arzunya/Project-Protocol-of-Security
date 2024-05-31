export class InvalidParamError extends Error {
    constructor (paramName : string) {
        super("Parâmetro invalido: ${paramName}")
        this.name = "Erro de parâmetro invalido"
    }
}