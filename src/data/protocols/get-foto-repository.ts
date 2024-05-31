import { FotoModel, GetFotoModel } from "../../presentention/controllers/foto/foto-protocols";

export interface GetFotoRepository {
    add (accountData: GetFotoModel): Promise<FotoModel>
}