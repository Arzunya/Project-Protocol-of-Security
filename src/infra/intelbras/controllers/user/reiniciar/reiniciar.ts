import { AxiosDigestAuth, AxiosDigestAuthOptions } from "@lukesthl/ts-axios-digest-auth";

export class IntelbrasReiniciar {
  static get: any;
  async get(ip: string): Promise<any> {
    try {
      const authOptions: AxiosDigestAuthOptions = {
        username: process.env.MY_DIGEST_USERNAME || "admin",
        password: process.env.MY_DIGEST_PASSWORD || "admin1234",
      };
      const digestAuth = new AxiosDigestAuth(authOptions);

      console.log("IP enviado para a API:", ip);

      const response = await digestAuth.request({
        method: "GET",
        url: `http://${ip}:50080/cgi-bin/magicBox.cgi?action=reboot`,
      });

      if (response.status !== 200) return false;
      else return response.data;
    } catch (error: any) {
      console.error("Erro ao fazer a solicitação:", error.response.message);
      return false;
    }
  }
}
