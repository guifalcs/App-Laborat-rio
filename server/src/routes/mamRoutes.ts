import express, { Request, Response } from "express";
import WhatsAppConection from "../MAM/conection";

const conection = new WhatsAppConection();

const mamRoutes = express.Router();

mamRoutes.get("/connect", async (req: Request, res: Response) => {
  try {
    await conection.obterConexao();
    res.json(`${conection.codigo}`);
  } catch (error) {
    res.status(500).send("Erro ao gerar QR Code. " + error);
  }
});

mamRoutes.post("/sendMessage", async (req: Request, res: Response) => {
  const { numero, nomeCliente, dataColeta } = req.body;

  if (!numero || !nomeCliente || !dataColeta) {
    res
      .status(400)
      .send("Número, nome do cliente e a data da coleta precisam ser enviados");

      return
  }

  try {
    if (!conection.client.pupPage) {
      await conection.obterConexao();
    }

    await conection.mandarMensagem(numero, nomeCliente, dataColeta);

    res.status(200).send(`Mensagem enviada para ${numero}`);
  } catch (erro) {
    res.status(500).send("Erro ao enviar a mensagem." + erro);
  }
});

export default mamRoutes;
