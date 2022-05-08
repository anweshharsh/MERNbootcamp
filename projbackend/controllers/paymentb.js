const braintree = require("braintree");

var gateway = new braintree.BraintreeGateway({
        environment: braintree.Environment.Sandbox,
        merchantId:'7d9bbkdsq5p7fgxd',
        publicKey:'jfg59hxzsc3dgc99',
        privateKey:'eba22ea31f4ae082cdf1c75e130d9d4f'
      
});


exports.getToken = (req,res) => {
    gateway.clientToken.generate({}, 
        function (err, response) {
        if(err) {
            res.status(500).send(err)
        }else {
            res.send(response)
        }
      });
}

exports.processPayment = (req,res) => {
 let nonceFromTheClient = req.body.paymentMethodNonce

 let amountFromTheClient = req.body.amount

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err){
              res.status(500).json(error)
          } else {
              res.json(result)
          }
      });


}