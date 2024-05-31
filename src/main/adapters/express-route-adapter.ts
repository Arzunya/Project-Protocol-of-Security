import { Controller } from "../../presentention/protocols/controller";
import { Request, Response } from "express";
import { HttpRequest } from "../../presentention/protocols/http";

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    try {
      const httpRequest: HttpRequest = {
        body: req.body,
        params: req.params,
      };
      const httpResponse = await controller.handle(httpRequest);
      console.log(httpResponse.body)

      return res.contentType(httpResponse.responseType).status(httpResponse.statusCode).send(httpResponse.body);
    } catch (err: any) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  };
};
