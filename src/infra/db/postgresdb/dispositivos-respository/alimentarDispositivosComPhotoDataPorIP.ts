import { buscarUsuariosComPhotoDataPorNivel } from "../account-repository/buscarUsuariosComPhotoDataPorNivel";
import { buscarIPsPorNivelAcesso } from "../account-repository/buscarIPsPorNivelAcesso";
import { AxiosDigestAuth, AxiosDigestAuthOptions } from "@lukesthl/ts-axios-digest-auth";

interface UsuarioComPhotoData {
  id: string;
  PhotoData: string;
}

export async function alimentarDispositivosComPhotoDataPorIP(idAcesso: number) {
  const usuariosComPhotoData = await buscarUsuariosComPhotoDataPorNivel(idAcesso);
  const ips = await buscarIPsPorNivelAcesso(idAcesso);

  try {
    for await (const ip of ips) {
      const data = usuariosComPhotoData.map((user) => ({
        UserID: String(user.id),
        PhotoData: [user.PhotoData],
      }));

      console.log(`Alimentando dispositivos no IP ${ip} com a PhotoData dos usuários:`);

      const authOptions: AxiosDigestAuthOptions = {
        username: process.env.MY_DIGEST_USERNAME || "admin",
        password: process.env.MY_DIGEST_PASSWORD || "admin1234",
      };
      const digestAuth = new AxiosDigestAuth(authOptions);

      // console.log(JSON.stringify({ FaceList: data })); // Remova a camada extra de array
      await digestAuth.request({
        method: "POST",
        url: `http://${ip}:50080/cgi-bin/AccessFace.cgi?action=insertMulti`,
        data: { FaceList: data }, // Use diretamente o array data
      });
    }
  } catch (error: any) {
    throw `Erro ao alimentar dispositivos com PhotoData por IP: ${error.message}`;
  }
}
