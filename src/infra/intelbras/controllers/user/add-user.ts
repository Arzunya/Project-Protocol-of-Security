import { AxiosDigestAuth, AxiosDigestAuthOptions } from "@lukesthl/ts-axios-digest-auth";

export class IntelbrasDepositoBase {
  async add(user: { UserName: string | null; UserID: string; Password: string | null; ip: string | null; PhotoData: string; ValidFrom: string; ValidTo: string }): Promise<boolean> {
    const data = {
      ...{
        UserType: 0,
        UseTime: 1300000,
        Authority: 2,
        
      },
      ...user,
    };

    console.log(data);
    try {
      const authOptions: AxiosDigestAuthOptions = {
        username: process.env.MY_DIGEST_USERNAME || "admin",
        password: process.env.MY_DIGEST_PASSWORD || "admin1234",
      };
      const digestAuth = new AxiosDigestAuth(authOptions);

      console.log("Dados enviados para a API:", data);

      const response = await digestAuth.request({
        method: "GET",
        url: `http://${user.ip}:50080/cgi-bin/AccessUser.cgi?action=insertMulti`,
        data: { UserList: [data] },
      });

      //ENVIA FOTO PARA DISPOSITIVO
      await digestAuth.request({
        method: "POST",
        url: `http://${user.ip}:50080/cgi-bin/AccessFace.cgi?action=insertMulti`,
        data: { FaceList: [{ UserID: String(user.UserID), PhotoData: [user.PhotoData] }] },
      });

      console.log('tudo certo')

      if (response.status !== 200) return false;
      else return true;
    } catch (error: any) {
      return false;
    }
  }
}
