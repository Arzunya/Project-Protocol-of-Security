import { HttpResponse } from "../../presentention/protocols";
import { ZonasModel } from "../models/zonas";

export interface AltZonaModel {
  nome: string;
}

export interface AltZona {
  alt (zonaAlt: ZonasModel): Promise<HttpResponse>;
}
