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
}

export default WhatsAppConection;
