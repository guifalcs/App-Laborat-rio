import { Client, LocalAuth } from "whatsapp-web.js";

export default function initializateWhatsApp() {
  const client = new Client({
    authStrategy: new LocalAuth(),
  });
  return client;
}
