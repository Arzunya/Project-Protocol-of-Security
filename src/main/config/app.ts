import Express from "express";
import setupMiddlewares from "./middlewares";
import setupRoutes from "./routes";

const app = Express();

app.use(Express.json({ limit: "1mb" }));
app.use(Express.urlencoded({ limit: "1mb", extended: true }));
app.use("/api/public", Express.static("./public"));
setupMiddlewares(app);
setupRoutes(app);

export default app;
