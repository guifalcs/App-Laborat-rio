import express from "express";
import router from "./router";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import initializateWhatsApp from "./MAM/conection";
import SocketService from "./MAM/socket";
import { WAState } from "whatsapp-web.js";

const app = express();
const port = process.env.SERVER_PORT || 8081;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use(router);

const socketService = new SocketService(io);
const whatsAppClient = initializateWhatsApp();

io.on("connection", (socket) => {

  if (whatsAppClient.info && whatsAppClient.info.wid) {
    socket.emit("status", { status: "connected" });
  } else {
    socket.emit("status", { status: "disconnected" });
  }

  socket.on("send_message", async (data: { numero: string, mensagem: string }) => {
    const { numero, mensagem } = data;
    if(!numero || !mensagem){
      console.log("Número e mensagem precisam estar preenchidos")
      return
    }

    if(/\D/.test(numero)){
      console.log("O número não deve conter caracteres que não sejam numerais.")
      return
    }

    try {
      const chat = await whatsAppClient.getChatById(numero + '@c.us');
      await chat.sendMessage(mensagem);
      socketService.emitMessageSent()
    } catch (error) {
      console.error("Erro ao enviar mensagem para o WhatsApp:", error);
      socketService.emitMessageNotSent()
    }

  });
});

whatsAppClient.on("qr", async (qr) => {
  try {
    socketService.emitQRCode(qr);
  } catch (error) {
    console.error("QR Code generation error:", error);
  }
});

whatsAppClient.on("auth_failure", (msg) => {
  console.error("Authentication failed:", msg);
  socketService.emitDisconnected();
});

whatsAppClient.on("ready", () => {
  socketService.emitReady();
});

whatsAppClient.on("disconnected", () => {
  socketService.emitDisconnected();
});

setInterval(() => {
  if (!whatsAppClient.info || !whatsAppClient.info.wid) {
      socketService.emitDisconnected()
  }
}, 60000);

whatsAppClient.initialize();

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
