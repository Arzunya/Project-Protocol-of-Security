import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import fs from "fs";
import multer from "multer";
import formidable from "formidable";
import { insertEventData } from "@infra/db/postgresdb/log-repository/log";
import pathTeste, { dirname } from "path";

const prisma = new PrismaClient();
const upload = multer();

export type IEvento = {
  Channel: number;
  Events: {
    Action: string;
    Code: string;
    Data: {
      CardName: string;
      CardNo: string;
      CardType: number;
      CreateTime: number;
      Door: number;
      ErrorCode: number;
      ImageInfo: {
        Height: number;
        Length: number;
        Offset: number;
        Type: number;
        Width: number;
      }[];
      Method: number;
      ReaderID: string;
      Status: number;
      Type: string;
      UTC: number;
      UserID: string;
      UserType: number;
    };
    Index: number;
    PhysicalAddress: string;
  }[];
  FilePath: string;
  Time: string;
};

export default (router: Router): void => {
  router.all("/escuta", async (request, response) => {
    try {
      let clientIP: string;

      if (typeof request.headers["x-forwarded-for"] === "string") {
        clientIP = request.headers["x-forwarded-for"];
      } else {
        clientIP = request.connection.remoteAddress || "";
      }

      if (request.method == "GET") {
        console.log("GET at " + request.url);
        var body = "";
        request.on("data", function (data) {
          body += data;
        });
        request.on("end", function () {
          var waitTill = new Date(new Date().getTime() + 4 * 1000);
          while (waitTill > new Date()) {}
          response.end("OK");
        });
      } else if (request.method == "POST") {
        const form = formidable({ encoding: "utf-8", uploadDir: "./temp" });
        let fields: formidable.Fields<string>;
        let files: formidable.Files<"info" | "file">;
        // console.log(dirname(".."));

        const date = new Date();
        let path = "";

        [fields, files] = await form.parse(request);
        files.file?.map((event) => {
          path = event.filepath;
        });

        const eventsData: IEvento[] = (files.info ?? []).map((event) => {
          const eventos: IEvento = JSON.parse(fs.readFileSync(event.filepath, { encoding: "utf-8" }));
          return eventos;
        });

        const result = await insertEventData(eventsData, clientIP);

        if (result) {
          fs.writeFileSync(`./public/${result.id}.jpg`, fs.readFileSync(path));
          fs.rmSync(path);
        }

        response.end("received POST request.");
      } else {
        response.end("Undefined request.");
      }
    } catch (error) {
      console.error("Erro no servidor:", error);
      response.status(500).send("Internal Server Error");
    }
  });
};
