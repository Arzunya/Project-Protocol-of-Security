import { PrismaClient } from "@prisma/client";
import { AddDispositivosRepository } from "../../../../data/protocols/add-dispositivo-repository";
import { AddDispositivosModel } from "../../../../domain/usecases/add-dispositivos";
import { DispositivosModel } from "../../../../domain/models/dipositivos";


export class AttDispositivosPosgresRepository implements AddDispositivosRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async add(dispositivoData: AddDispositivosModel): Promise<DispositivosModel> {
    console.log(dispositivoData);

    const attDispositivo = await this.prisma.dispositivo.update({
        
        where: { 
            id: dispositivoData.id,
        },
        data: {
            nome: dispositivoData.nome,
            n_serial: dispositivoData.n_serial,
            ip: dispositivoData.ip,
            zonaId: dispositivoData.zonaId,
            mac: dispositivoData.mac,
          },
        
    });
    return attDispositivo;

    
    }
   
}
