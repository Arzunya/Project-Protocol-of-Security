import { PrismaClient } from "@prisma/client";
import { IEvento } from "../../../../main/routes/log/log-routes";
import { socketSeg } from "../../../../infra/socketIO/socketSeguranca";

const prisma = new PrismaClient();

const methodMap: { [key: number]: string } = {
  0: "por senha",
  1: "por cartão de acesso",
  2: "por cartão de acesso e depois senha",
  3: "por senha e depois cartão de acesso",
  4: "por desbloqueio remoto",
  5: "por botão de saída",
  6: "por impressão digital",
  7: "por senha e cartão de acesso e impressão digital juntos",
  8: "por senha e impressão digital juntas",
  9: "por cartão de acesso e impressão digital juntos",
  10: "reservado",
  11: "por usuário de acesso múltiplo",
  12: "por chave",
  13: "por senha de coação",
  14: "por código QR, local",
  15: "por reconhecimento facial, local",
  16: "reservado",
  17: "por cartão de identificação",
  18: "por rosto e cartão de identificação",
  19: "por Bluetooth",
  20: "por senha personalizada",
  21: "por ID do usuário e senha",
  22: "por rosto e senha",
  23: "por impressão digital e senha",
  24: "por impressão digital e rosto",
  25: "por cartão de acesso e rosto",
  26: "por rosto ou senha",
  27: "por impressão digital ou senha",
  28: "por impressão digital ou rosto",
  29: "por cartão de acesso ou rosto",
  30: "por cartão de acesso ou impressão digital",
  31: "por impressão digital, rosto e senha",
  32: "por cartão de acesso, rosto e senha",
  33: "por cartão de acesso, impressão digital e senha",
  34: "por cartão de acesso, impressão digital e rosto",
  35: "por impressão digital, rosto ou senha",
  36: "por cartão de acesso, rosto ou senha",
  37: "por cartão de acesso, impressão digital ou rosto",
  38: "por cartão de acesso e impressão digital e rosto e senha",
  39: "por cartão de acesso ou impressão digital ou rosto ou senha",
  40: "por cartão de identificação e rosto, ou cartão de acesso ou rosto",
  41: "por cartão de identificação ou código QR ou rosto",
  42: "por DTMF (SIP INFO, RFC2833, INBAND)",
  43: "por código QR, remoto",
  44: "por reconhecimento facial, remoto",
  45: "por cartão de identificação (corresponde com impressão digital no cartão de identificação)",
  46: "por senha temporária",
  47: "por código de saúde",
};

const errorCodeMap: { [key: number]: string } = {
  0: "Sem erro",
  16: "Não autorizado",
  17: "Cartão perdido ou cancelado",
  18: "Sem permissão para este portão",
  19: "Modo de abertura de porta está errado",
  20: "Erro de data de expiração",
  21: "Modo de anti-passback",
  22: "Alarme de coação não aberto",
  23: "Status NC da porta",
  24: "Status de intertravamento AB",
  25: "Cartão de patrulha",
  32: "Erro de período de tempo",
  33: "Horário de abertura errado durante feriados",
  64: "O cartão está correto, a senha está incorreta",
  65: "O cartão está correto, a senha expirou",
  66: "O cartão está correto, a impressão digital está incorreta",
  67: "O cartão está correto, a impressão digital expirou",
  68: "A impressão digital está correta, a senha está incorreta",
  69: "A impressão digital está correta, a senha expirou",
  70: "UserID está correto, senha errada",
  71: "UserID está correto, senha expirada",
  82: "Combinação de usuário único para abrir a porta requer verificação contínua",
  96: "Aguardando verificação remota",
  97: "O cartão está correto, o rosto está incorreto",
  98: "O cartão está correto, o rosto expirou",
  99: "Entrada repetida",
  101: "Temperatura alta",
  102: "Não usando máscara",
  162: "Sequência de abertura de porta de combinação de usuário único está errada",
  164: "Erro de status do usuário (congelado)",
  165: "Tempo de uso do convidado está completo",
  169: "Tempo excedido do cartão ilegal",
};

const macSeguranca = ["80:85:44:2c:1f:f1"];

export async function insertEventDataSeguranca(eventData: IEvento[], clientIP: string): Promise<{ id: number } | undefined> {
  try {
    const uniqueEventSets = removeDuplicates(eventData);

    
    const hasSpecificPhysicalAddress = uniqueEventSets.some(eventGroup =>
      eventGroup.Events.some(event => macSeguranca.includes(event.PhysicalAddress))
    );

    if (!hasSpecificPhysicalAddress) {
      return undefined;
    }

    for (const eventGroup of uniqueEventSets) {
      for (const event of eventGroup.Events) {
        const { Data, Action, PhysicalAddress, Code } = event;

        if (!Data) {
          continue;
        }

        const { CardName, UserID, Method, ErrorCode } = Data;

        

        

        

        if (!CardName && ErrorCode !== 16) {
          continue;
        }

        const methodDescription = methodMap[Method] || "Não especificado";
        const errorCodeDescription = errorCodeMap[ErrorCode] || "Código de erro não reconhecido";

        const dispositivo = await prisma.dispositivo.findFirst({ where: { ip: clientIP } });
        const user = await prisma.usuario.findFirst({ where: { id: Number(UserID) } });


        //console.log(`Processing event: ${JSON.stringify(event)}`);
        //console.log(`isSpecificFacial: ${isSpecificFacial}`);

        const  {id}  = await prisma.monitoramento.create({
          data: {
            cardName: CardName || "DESCONHECIDO",
            userID: user ? user.id : null,
            time: eventGroup.Time,
            errorCode: errorCodeDescription,
            method: methodDescription,
            dispositivoId: dispositivo ? dispositivo.id : null,
            message: "Solicitada a entrada na sala de monitoramento",
            facial: PhysicalAddress,
          },
        });

        await socketSeg(Data, id, event.PhysicalAddress)

        return {id};
      }
    }

    return;
  } catch (error) {
    console.error("Erro ao inserir eventos no banco de dados:", error);
    throw error;
  }
}

function removeDuplicates(eventData: IEvento[]): IEvento[] {
  const uniqueEventSets: IEvento[] = [];
  const seenEventSets: string[] = [];

  for (const eventGroup of eventData) {
    const eventSetString = JSON.stringify(eventGroup.Events);
    if (!seenEventSets.includes(eventSetString)) {
      seenEventSets.push(eventSetString);
      uniqueEventSets.push(eventGroup);
    }
  }

  return uniqueEventSets;
}
