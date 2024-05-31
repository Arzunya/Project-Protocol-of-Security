import { veiculoModel } from '../models/veiculo'

export interface AddVeiculoModel {
    id: number
    marca: string
    modelo: string
    cor: string
    placa: string
}

export interface AddVeiculos {
    add (veiculo: AddVeiculoModel): Promise<veiculoModel>
}