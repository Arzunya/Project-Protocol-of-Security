import { AxiosDigestAuth, AxiosDigestAuthOptions } from "@lukesthl/ts-axios-digest-auth";

export class IntelbrasDeletarUsuario {
  async del(user: { UserID: number, ip: string}): Promise<boolean> {
    try {

      if (!user.ip) {
        console.error('IP não fornecido');
        return false;
      }

      console.log(user.ip, user.UserID)

      console.log(`Recebido pedido de exclusão do usuário ID ${user.UserID} no dispositivo com IP ${user.ip}`);
      
      const authOptions: AxiosDigestAuthOptions = {
        username: process.env.MY_DIGEST_USERNAME || "admin",
        password: process.env.MY_DIGEST_PASSWORD || "admin1234",
      };
      const digestAuth = new AxiosDigestAuth(authOptions);
      
      const url = `http://${user.ip}:50080/cgi-bin/AccessUser.cgi?action=removeMulti&UserIDList[0]=${user.UserID}`;
      console.log(`URL da solicitação: ${url}`);

      const response = await digestAuth.request({
        method: "GET",
        url: url,
      });

      if (response.status !== 200) {
        console.error(`Erro ao excluir o usuário ID ${user.UserID} no dispositivo com IP ${user.ip}. Status: ${response.status}`);
        return false;
      } else {
        console.log(`Usuário ID ${user.UserID} excluído com sucesso do dispositivo com IP ${user.ip}`);
        return true;
      }
    } catch (error: any) {
      console.error("Erro ao fazer a solicitação:", error.response);
      return false;
    }
  }
}

