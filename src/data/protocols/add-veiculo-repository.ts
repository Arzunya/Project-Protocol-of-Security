import { AddVeiculoModel, veiculoModel } from '../../presentention/controllers/veiculo/veiculo-protocols'

export interface AddVeiculoRepository {
    add (Zona: AddVeiculoModel): Promise<veiculoModel>
    
}