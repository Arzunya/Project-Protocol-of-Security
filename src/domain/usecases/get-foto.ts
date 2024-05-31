import { FotoModel } from '../models/foto'

export interface GetFotoModel {
    
    id: number;
    ip: string;
}

export interface GetFoto {
    get (fotos: GetFotoModel): Promise<FotoModel>
}