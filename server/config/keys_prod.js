const keys = {
  mongo: {
    uri: process.env.MONGO_URI,
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    redirectDomain: process.env.SENDGRID_REDIRECT_DOMAIN,
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASS,
  },
  payFast: {
    MerchantID: process.env.PAYFAST_MERCHART_ID,
    MerchantKey: process.env.PAYFAST_MERCHANT_KEY,
  },
}

exports.keys = keys
