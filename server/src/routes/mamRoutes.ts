import express, { Request, Response } from "express";
import qrcode from "qrcode";
import WhatsAppConection from "../MAM/config";

const conection = new WhatsAppConection();

const mamRoutes = express.Router();

mamRoutes.get("/connect", async (req: Request, res: Response) => {
  const resultados = await conection.getConection();

  try {
    const qrCodeImage = await qrcode.toBuffer(conection.codigo);

    conection.client.on("ready", () => {
      res.redirect(
        "https://wwebjs.dev/guide/creating-your-bot/authentication.html#remote-stores"
      );
    });

    res.setHeader("Content-Type", "image/png");
    res.send(qrCodeImage);

  } catch (error) {

    console.error("Erro ao gerar QR Code:", error);
    res.status(500).send("Erro ao gerar QR Code.");
  }
});

export default mamRoutes;
