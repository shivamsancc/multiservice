// index.js
const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

const app = express();
const port = 3000;

// MongoDB setup
mongoose.connect('mongodb://mongodb-service:27017/contactpagedb', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const contactPageSchema = new mongoose.Schema({
  message: String
});

const ContactPage = mongoose.model('ContactPage', contactPageSchema);

// Redis setup
const redisClient = redis.createClient({ host: 'redis-service', port: 6379 });

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

app.get('/', async (req, res) => {
  redisClient.get('contactMessage', async (err, reply) => {
    if (reply) {
      res.send(`From Redis Cache: ${reply}`);
    } else {
      const contactPageMessage = await ContactPage.findOne();
      if (contactPageMessage) {
        redisClient.set('contactMessage', contactPageMessage.message);
        res.send(`From MongoDB: ${contactPageMessage.message}`);
      } else {
        res.send('No message found');
      }
    }
  });
});

app.listen(port, () => {
  console.log(`ContactPage API listening at http://localhost:${port}`);
});
