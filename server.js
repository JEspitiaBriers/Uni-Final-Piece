require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

//prevents CORS error -- Note that in a released version,
//CORS security methods would need updating
app.use(
  cors({
    origin: 'http://localhost:5173'
  })
);
app.use(express.static('public'));
app.use(express.json());

app.get('/publishStripeKey', (req, res) => {
  res.send(process.env.PUBLISH_STRIPE_KEY);
});

app.get('/api/key', (req, res) => {
  res.send(process.env.APILAYER_API_KEY);
});

app.get('/firebase/apiKeys', (req, res) => {
  console.log('HIT on firebase api keys');
  res.send({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  });
});

app.listen(4242, () => console.log('Node server listening on port 4242!'));
