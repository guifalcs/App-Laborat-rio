import express from "express";
import router from "./router";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import initializeWhatsAppService from "./MAM/whatsappService";
import SocketService from "./MAM/socket";

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

initializeWhatsAppService(socketService);

io.on("connection", (socket) => {

  const clientStatus = socketService.getClientStatus();
  socket.emit("status", clientStatus);

  socket.on("send_message", async (data: { numero: string; mensagem: string }) => {
    const { numero, mensagem } = data;
    if (!numero || !mensagem) {
      console.log("Número e mensagem precisam estar preenchidos");
      return;
    }

    if (/\D/.test(numero)) {
      console.log("O número não deve conter caracteres que não sejam numerais.");
      return;
    }

    try {
      await socketService.sendMessage(numero, mensagem);
    } catch (error) {
      console.error("Erro ao enviar mensagem para o WhatsApp:", error);
    }
  });
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
