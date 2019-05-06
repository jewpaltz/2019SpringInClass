const express = require('express');
const stripe = require("stripe")(process.env.STRIPE_PRIVATE);


const app = express.Router();

app.post("/charge", async (req, res, next) => {

    (async () => {

        try {
            const charge = await stripe.charges.create({
            amount: req.body.amount,
            currency: 'usd',
            source: req.body.token,
            receipt_email: req.body.email,
            });

            res.send(charge);
            
        } catch (error) {
            next(error);
        }

      })();
      
});

module.exports = app;