import express, { Request, Response } from "express";
import WhatsAppConection from "../MAM/conection";

const conection = new WhatsAppConection();

const mamRoutes = express.Router();

mamRoutes.get("/connect", async (req: Request, res: Response) => {
  try {
    const qrCode = await conection.getCodeConection();
    res.json("QRCODE criado com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao gerar QR Code. " + error);
  }
});

export default mamRoutes;
