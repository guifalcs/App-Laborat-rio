import express, { Request, Response } from "express";
import qrcode from "qrcode";
import WhatsAppConection from "../MAM/conection";

const conection = new WhatsAppConection();

const mamRoutes = express.Router();

mamRoutes.get("/connect", async (req: Request, res: Response) => {
  try {
    const qrCode = await conection.getCodeConection();

    const qrCodeImage = await qrcode.toBuffer(qrCode);

    res.setHeader("Content-Type", "image/png");
    res.send(qrCodeImage);
  } catch (error) {
    res.status(500).send("Erro ao gerar QR Code. " + error);
  }
});

export default mamRoutes;
