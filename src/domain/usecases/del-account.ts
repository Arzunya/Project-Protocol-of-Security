import { HttpResponse } from "../../presentention/protocols";
import { DeletarContaModel } from "../models/deletarConta";

export interface DelAccountModel {
  id: any;
  status: number
}

export interface DelAccount {
  del(accountDel: DelAccountModel): Promise<HttpResponse>;
}
