require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

app.use(
  cors({
    origin: 'http://localhost:5173'
  })
);
app.use(express.static('public'));
app.use(express.json());

// const calculateOrderAmount = (items) => {
//   // Replace this constant with a calculation of the order's amount
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   return 1400;
// };

app.get('/api/key', (req, res) => {
  console.log('API key route hit!');
  res.send(process.env.APILAYER_API_KEY);
});

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

app.listen(4242, () => console.log('Node server listening on port 4242!'));
