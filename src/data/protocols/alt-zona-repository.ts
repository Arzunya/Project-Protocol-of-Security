import { AltZonaModel, AltZona } from "../../presentention/controllers/alterar-zona/alterar-zona-protocol";

export interface AttZonaRepository {
    alt (zonaAlt: AltZonaModel): Promise<AltZona>
}
