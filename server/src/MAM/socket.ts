import { Client } from "whatsapp-web.js";

export default class SocketService {
  private io: any;
  private whatsAppClient: Client | null = null;

  constructor(io: any) {
    this.io = io;
  }

  setWhatsAppClient(client: Client) {
    this.whatsAppClient = client;
  }

  getClientStatus() {
    if (this.whatsAppClient?.info?.wid) {
      return { status: "connected" };
    }
    return { status: "disconnected" };
  }

  async sendMessage(numero: string, mensagem: string) {
    if (!this.whatsAppClient) {
      throw new Error("Cliente WhatsApp não inicializado.");
    }

    const chat = await this.whatsAppClient.getChatById(`${numero}@c.us`);
    await chat.sendMessage(mensagem);

    this.emitMessageSent();
  }

  emitQRCode(qr: string) {
    this.io.emit("qr", qr);
  }

  emitReady() {
    this.io.emit("ready");
  }

  emitDisconnected() {
    this.io.emit("disconnected");
  }

  emitMessageSent() {
    this.io.emit("messageSent");
  }

  emitMessageNotSent() {
    this.io.emit("messageNotSent");
  }
}
