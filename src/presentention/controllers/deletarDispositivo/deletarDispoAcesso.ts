import { HttpResponse, HttpRequest, Controller } from "./deletarDispositivo-protocol";
import { DelDispoAcesso } from "../../../domain/usecases/del-DispoAcesso";
import { IntelbrasDeletarUsuario } from "../../../infra/intelbras/controllers/user/del-user";
import { Prisma, PrismaClient } from "@prisma/client";
import { ok, serverError, badRequest } from "../../helpers/http-helper";

export class DeletarDispoAcessoController implements Controller {
    private readonly delDispositivo: DelDispoAcesso;
    private readonly intelbrasDeletarUsuario: IntelbrasDeletarUsuario;
    private prisma: PrismaClient;

    constructor(delDispositivo: DelDispoAcesso, intelbrasDeletarUsuario: IntelbrasDeletarUsuario) {
        this.delDispositivo = delDispositivo;
        this.intelbrasDeletarUsuario = intelbrasDeletarUsuario;
        this.prisma = new PrismaClient({ log: ["info", "query", "warn"] });
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        if (!httpRequest.body || !httpRequest.body.id) {
            return badRequest('ID não fornecido na requisição.');
        }
        
        const { id } = httpRequest.body;

        try {
            
            const dispositivosAcesso = await this.prisma.dispositivo_acesso.findMany({
                where: { id },
                include: {
                    nivel: { 
                        include: {
                            acesso_usuario: { 
                                include: {
                                    usuario: true, 
                                }
                            }
                        }
                    },
                    dispositivo: true, 
                },
            });

            if (dispositivosAcesso.length === 0) {
                return badRequest(`Coluna em dispositivo_acesso com ID ${id} não encontrada.`);
            }

            const usuariosEips = dispositivosAcesso.map((dispositivoAcesso) => ({
                usuarioIds: dispositivoAcesso.nivel.acesso_usuario.map((acessoUsuario) => acessoUsuario.usuario.id),
                ip: dispositivoAcesso.dispositivo.ip,
            }));

            if (!usuariosEips || usuariosEips.length === 0) {
                return badRequest("Nenhum usuário ou dispositivo encontrado.");
            }

            for (const item of usuariosEips) {
                const { usuarioIds, ip } = item;

                if (!ip) {
                    console.error('IP não fornecido para o dispositivo.');
                    return serverError();
                }

                for (const userId of usuarioIds) {
                    const deleted = await this.intelbrasDeletarUsuario.del({ UserID: userId, ip });

                    if (!deleted) {
                        return serverError(`Erro ao excluir o usuário ID ${userId} no dispositivo com IP ${ip}.`);
                    }
                }
            }

            await this.prisma.dispositivo_acesso.deleteMany({
                where: { id },
            });

            return ok({ message: 'Usuários excluídos com sucesso nos dispositivos.' });
        } catch (error) {
            console.error("Erro ao processar a requisição:", error);
            return serverError();
        }
    }
}
