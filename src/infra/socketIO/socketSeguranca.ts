import { io } from "../../main/config/app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function socketSeg (Data: { CardName: string; CardNo: string; CardType: number; CreateTime: number; Door: number; ErrorCode: number; ImageInfo: { Height: number; Length: number; Offset: number; Type: number; Width: number; }[]; Method: number; ReaderID: string; Status: number; Type: string; UTC: number; UserID: string; UserType: number;}, id: number, PhysicalAddress: string) {

    try {
        const dispositivo = await prisma.dispositivo.findFirst({
            where: {
                mac: PhysicalAddress
            }
        });

        io.emit('seg', Data.CardName, id, dispositivo?.nome);
    } catch (error) {
        console.error('Erro na consulta do dispositivo:', error);
    } finally {
        await prisma.$disconnect();
    }

    return;
}


