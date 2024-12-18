import express from "express";
import router from "./router";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import initializateWhatsApp from "./MAM/conection";
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

const socket = new SocketService(io);

const whatsAppClient = initializateWhatsApp();

io.on("connection", (socket) => {

  if (whatsAppClient.info && whatsAppClient.info.wid) {
    socket.emit("status", { status: "connected" });
  } else {
    socket.emit("status", { status: "disconnected" });
  }
});


whatsAppClient.on("qr", async (qr) => {
  try {
    socket.emitQRCode(qr);
  } catch (error) {
    console.error("QR Code generation error:", error);
  }
});

whatsAppClient.on("auth_failure", (msg) => {
  console.error("Authentication failed:", msg);
  socket.emitDisconnected();
});

whatsAppClient.on("ready", () => {
  socket.emitReady();
});

whatsAppClient.on("disconnected", () => {
  socket.emitDisconnected();
});

whatsAppClient.initialize();

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
