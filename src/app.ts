import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";

const app = express();

// Activation des cors pour toutes les routes
app.use(cors());

// Utilisation de body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res
    .json({
      message: "Bienvenue sur notre API RESTful",
      version: "1.0.0",
    })
    .status(200);
});

export default app;
