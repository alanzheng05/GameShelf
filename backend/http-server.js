const http = require('http');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`GameShelf server listening on port ${PORT}`);
});
