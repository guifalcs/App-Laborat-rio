import express, { Request, Response } from "express";
import qrcode from "qrcode";
import WhatsAppConection from "../MAM/conection";

const conection = new WhatsAppConection();

const mamRoutes = express.Router();

mamRoutes.get("/connect", async (req: Request, res: Response) => {

    console.log('vai plmds')

  await conection.client.initialize()

  conection.client.on('qr', (qr: any) => {
    console.log('QR RECEIVED', qr);
  });

  try {
    const qrCodeImage = await qrcode.toBuffer(conection.codigo);

    // conection.client.once("ready", () => {
    //   res.redirect(
    //     "https://wwebjs.dev/guide/creating-your-bot/authentication.html#remote-stores"
    //   );
    // });

    res.setHeader("Content-Type", "image/png");
    res.send(qrCodeImage);
  } catch (error) {
    res.status(500).send("Erro ao gerar QR Code.");
  }
});

export default mamRoutes;
