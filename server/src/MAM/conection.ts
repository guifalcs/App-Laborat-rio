import { LocalAuth } from "whatsapp-web.js";
import { Client } from "whatsapp-web.js";

//testing some crazy things here

class WhatsAppConection {
  codigo: any = "";
  client: any = "";

  constructor() {
    const client = new Client({
      // authStrategy: new LocalAuth({ clientId: "botLab" }),
    });

    this.client = client;
  }

  async obterConexao(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.on("qr", (qr: any) => {
        this.codigo = qr;
        resolve(this.codigo);
      });

      this.client.on("ready", () => {
        console.log("Cliente está pronto!");
      });

      this.client.on("disconnected", (motivo: any) => {
        console.log(`Cliente desconectado. Razão: ${motivo}`);
      });

      this.client.initialize().catch((error: any) => {
        console.log("Erro ao iniciar o cliente:", error);
        reject(error);
      });
    });
  }

  async mandarMensagem(
    numero: string,
    nomeCliente: string,
    dataColeta: string
  ) {
    try {
      const chat = await this.client.getChatById(`${numero}@c.us`);
      await chat.sendMessage(
        `Fala, grande. Como vai, ${nomeCliente}. Ta lembrando do dia ${dataColeta}, né?`
      );
      console.log("Mensagem enviada");
    } catch (erro) {
      console.log("Erro ao enviar mensagem:", erro);
    }
  }
}

export default WhatsAppConection;
