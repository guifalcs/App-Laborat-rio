export default class SocketService {
  constructor(private io: any) {
    this.io = io;
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
}
