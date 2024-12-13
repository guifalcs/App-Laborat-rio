import { LocalAuth } from "whatsapp-web.js";

const { Client } = require("whatsapp-web.js");

class WhatsAppConection {
  codigo: any = "";
  client: any = "";

  constructor() {
    const client = new Client({
      authStrategy: new LocalAuth({
        clientId: "botLab",
        dataPath: "./sessions",
      }),
    });

    this.client = client;
  }

  async getCodeConection(): Promise<string> {
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

      this.client.initialize();
    });
  }
}

export default WhatsAppConection;
