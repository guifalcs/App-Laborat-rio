import express, { Request, Response } from "express";
import qrcode from "qrcode";
import WhatsAppConection from "../MAM/conection";

const conection = new WhatsAppConection();

const mamRoutes = express.Router();

mamRoutes.get("/connect", async (req: Request, res: Response) => {
  await conection.initConection();

  try {
    const qrCodeImage = qrcode.toBuffer(conection.codigo);

    conection.client.on("ready", () => {
      res.redirect(
        "https://wwebjs.dev/guide/creating-your-bot/authentication.html#remote-stores"
      );
    });

    res.setHeader("Content-Type", "image/png");
    res.send(qrCodeImage);
  } catch (error) {
    res.status(500).send("Erro ao gerar QR Code.");
  }
});

export default mamRoutes;
