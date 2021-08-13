const express = require('express');
const { config } = require('./src/config');
var compression = require('compression');
const cors = require('cors');
const path = require('path');
const routes = require('./src/routes');
const app = express();
app.use(cors());
app.use(compression());
app.use(express.json());

app.use(
  '/uploads/user/profileImages',
  express.static(path.join(__dirname, 'uploads/user/profileImages'))
);
app.use('/api/v1', routes);
const port = config.port || 4000;
const server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = server;
