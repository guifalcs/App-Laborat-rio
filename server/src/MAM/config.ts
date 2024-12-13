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

  async getConection() {
    await this.client.on("ready", () => {
      console.log("Cliente está pronto!");
    });

    await this.client.initialize();
  }
}

export default WhatsAppConection;
