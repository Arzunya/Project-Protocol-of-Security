import { HttpResponse, HttpRequest, Controller, DelAccount } from "./deletar-protocol";
import { badRequest, serverError, ok } from "../../helpers/http-helper";
import { PrismaClient } from "@prisma/client";

export class DeletarController implements Controller {
  private readonly delAccount: DelAccount;

  constructor(delAccount: DelAccount) {
    this.delAccount = delAccount;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id, status  } = httpRequest.body;

    const account = await this.delAccount.del({
      id,
      status

    });

    return account;
  }
}
