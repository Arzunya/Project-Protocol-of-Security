import { PrismaClient } from "@prisma/client";
import { AxiosDigestAuth, AxiosDigestAuthOptions } from "@lukesthl/ts-axios-digest-auth";

const prisma = new PrismaClient();

export async function buscarUsuariosPorNivelEChamarAPI({ idDispositivo }: { idDispositivo: number }) {
  const niveis = await prisma.acesso.findMany({ where: { dispositivo_acesso: { every: { dispositivoId: idDispositivo } } } });

  const usuarios = await prisma.usuario.findMany({
    where: { acesso_usuario: { every: { acesso: { id: { in: niveis.map((nivel) => nivel.id) } } } } },
  });
  // const usuarios = await prisma.usuario.findMany({ where: { acesso_usuario: { every: { acesso: { id: idAcesso } } } } });

  const dispositivo = await prisma.dispositivo.findFirst({ where: { id: idDispositivo } });

  if (!dispositivo) {
    throw "Dispositivo não existe !";
  }

  if (!usuarios || usuarios.length == 0) {
    throw "Nenhum usuário nesse dispositivo !";
  }

  const data = usuarios.map((user) => ({
    UserType: 0,
    UseTime: 200,
    ValidFrom: "2019-01-02 00:00:00",
    ValidTo: "2037-01-02 01:00:00",
    Authority: 2,
    UserName: user.nome,
    Password: user.senha,
    UserID: String(user.id),
    PhotoData: user.PhotoData,
  }));

  try {
    // console.log("Dados enviados para a API:", data);

    const authOptions: AxiosDigestAuthOptions = {
      username: process.env.MY_DIGEST_USERNAME || "admin",
      password: process.env.MY_DIGEST_PASSWORD || "admin1234",
    };
    const digestAuth = new AxiosDigestAuth(authOptions);

    // DELETA TODOS OS USUARIOS DO DISPOSITIVO
    await digestAuth.request({
      method: "POST",
      url: `http://${dispositivo.ip}:50080/cgi-bin/AccessUser.cgi?action=removeAll`,
    });

    const response = await digestAuth.request({
      method: "POST",
      url: `http://${dispositivo.ip}:50080/cgi-bin/AccessUser.cgi?action=insertMulti`,
      data: { UserList: data },
    });

    // ENVIA FOTO PARA DISPOSITIVO
    await digestAuth.request({
      method: "POST",
      url: `http://${dispositivo.ip}:50080/cgi-bin/AccessFace.cgi?action=insertMulti`,
      data: { FaceList: data.map((value) => ({ UserID: value.UserID, PhotoData: [value.PhotoData] })) },
      //  data: { FaceList: [{ UserID: String(user.UserID), PhotoData: [user.PhotoData] }] }, // Use diretamente o array data
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw "Erro ao chamar API de terceiros.";
    }
  } catch (error) {
    console.log(error);
    throw "Erro ao buscar usuários por nível de acesso e chamar API.";
  }
}
