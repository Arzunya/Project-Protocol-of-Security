import { HttpResponse } from "../protocols/http";
import { ServerError } from "../errors/server-error";

export const badRequest = (message?: string): HttpResponse => ({
  statusCode: 400,
  body: {
    error: message || "Bad Request"
  },
  responseType: "json",
});

export const serverError = (message?: string): HttpResponse => ({
  statusCode: 500,
  body: {
    error: message || "Internal server error",
  },
  responseType: "json",
});

export const ok = (data: any, message?: string): HttpResponse => ({
  statusCode: 200,
  body: {
    message: message || "Sucesso!",
    data,
  },
  responseType: "json",
});

export const okFoto = (data: any, responseType?: "json" | "jpg"): HttpResponse => ({
  statusCode: 200,
  body: data,
  responseType: responseType || "json",
});
