const http = require('http');
const app = require('./app');
require('dotenv').config();

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

const PORT = normalizePort(process.env.PORT || '3000');

const httpServer = http.createServer(app);

httpServer.listen(PORT);

httpServer.on('listening', () => {
  const addr = httpServer.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`GameShelf server listening on ${bind}`);
});

httpServer.on('error', (error) => {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof PORT === 'string' ? `pipe ${PORT}` : `port ${PORT}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
});
