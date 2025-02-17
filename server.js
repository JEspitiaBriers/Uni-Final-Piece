require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

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

// app.get('/firebase/apiKey', (req, res) => {
//   res.send(process.env.FIREBASE_API_KEY);
// });

// app.get('/firebase/authDomain', (req, res) => {
//   res.send(process.env.FIREBASE_AUTH_DOMAIN);
// });

// app.get('/firebase/projectID', (req, res) => {
//   res.send(process.env.FIREBASE_PROJECT_ID);
// });

// app.get('/firebase/storageBucket', (req, res) => {
//   res.send(process.env.FIREBASE_STORAGE_BUCKET);
// });

// app.get('/firebase/messagingSenderID', (req, res) => {
//   res.send(process.env.FIREBASE_MESSAGING_SENDER_ID);
// });

// app.get('/firebase/appID', (req, res) => {
//   res.send(process.env.FIREBASE_APP_ID);
// });

app.listen(4242, () => console.log('Node server listening on port 4242!'));

// const calculateOrderAmount = (items) => {
//   // Replace this constant with a calculation of the order's amount
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   return 1400;
// };

// app.post('/create-payment-intent', async (req, res) => {
//   const { items } = req.body;

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: 'gbp',
//     automatic_payment_methods: {
//       enabled: true
//     }
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret
//   });
// });
