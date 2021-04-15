const braintree = require("braintree");
require('dotenv').config();

const gateway = new braintree.BraintreeGateway({
    environment:  braintree.Environment.Sandbox,
    merchantId:   process.env.merchantId,
    publicKey:    process.env.publicKey,
    privateKey:   process.env.privateKey
});


exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        // pass clientToken to your front-end
        if(err) {
            res.status(500).send(err)
        }
        else {
            res.send(response)
        }
      });
}

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient =  req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err) {
              res.this.state(500).json(err)
          }
          else{
              res.json(result)
          }
      });
}