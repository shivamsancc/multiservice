// index.js
const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

const app = express();
const port = 3000;

// MongoDB setup
mongoose.connect('mongodb://mongodb-service:27017/listservicedb', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const listServiceSchema = new mongoose.Schema({
  message: String
});

const ListService = mongoose.model('ListService', listServiceSchema);

// Redis setup
const redisClient = redis.createClient({ host: 'redis-service', port: 6379 });

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

app.get('/', async (req, res) => {
  redisClient.get('listMessage', async (err, reply) => {
    if (reply) {
      res.send(`From Redis Cache: ${reply}`);
    } else {
      const listServiceMessage = await ListService.findOne();
      if (listServiceMessage) {
        redisClient.set('listMessage', listServiceMessage.message);
        res.send(`From MongoDB: ${listServiceMessage.message}`);
      } else {
        res.send('No message found');
      }
    }
  });
});

app.listen(port, () => {
  console.log(`ListService API listening at http://localhost:${port}`);
});
