import { Client, LocalAuth } from "whatsapp-web.js";
import SocketService from "./socket";

export default function initializeWhatsAppService(socketService: SocketService) {
  const client = new Client({
    authStrategy: new LocalAuth(),
  });

  client.on("qr", (qr) => {
    console.log("QR Code recebido");
    socketService.emitQRCode(qr);
  });

  client.on("auth_failure", (msg) => {
    console.error("Falha na autenticação:", msg);
    socketService.emitDisconnected();
  });

  client.on("ready", () => {
    console.log("WhatsApp está pronto!");
    socketService.emitReady();
  });

  client.on("disconnected", (reason) => {
    console.log("WhatsApp desconectado:", reason);
    socketService.emitDisconnected();
  });

  client.initialize();

  socketService.setWhatsAppClient(client);

  setInterval(() => {
    const isConnected = client.info?.wid;
    if (!isConnected) {
      socketService.emitDisconnected();
    }
  }, 60000);

  return client;
}
