import Client from 'whatsapp-web.js'

const client = new Client();

client.once('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
});

client.initialize();
