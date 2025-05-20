import fs from 'fs';
import https from 'https';
import Server from './src/server.mjs';

const server = new Server();

await server.run(); 

const httpsOptions = {
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem')
};

https.createServer(httpsOptions, server.app).listen(3443, () => {
  console.log('Serveur HTTPS démarré sur https://localhost:3443');
});
