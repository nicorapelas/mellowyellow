const keys = require('../config/keys').keys

module.exports = (newOrder) => {
  return `
  <html>
  <head>
    <title></title>
  </head>
  <body>
    <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
    <div>
      <img style="width:170px;" src="http://cdn.mcauto-images-production.sendgrid.net/7c24a358626a9096/41a1f3c0-4f6f-4c1c-bc61-234be15a282f/636x209.png" alt="mellowyellow-logo" />
    </div>
    <div style="margin-top: 20px;">
      <div style="font-size:1.2rem; font-weight: 900; margin-bottom: 15px;">Sales Order</div>
      <div>CBD 400MG Ointment 50ML x ${newOrder.ointmentQuantity}</div>
      <div>CBD 400MG Oil 30ML x ${newOrder.oilQuantity}</div>
      <div>CBD 400MG Ointment 50M + CBD 400MG Oil 30ML x ${newOrder.comboQuantity}</div>
      <div style="margin-top: 5px; font-weight: 900">TOTAL R${newOrder.totalPrice}</div>
    </div>
    <div style="margin-top: 20px;">
      <div style="font-size:1.2rem; font-weight: 900; margin-bottom: 15px;">Delivery Info</div>
      <div>Name: ${newOrder.name}</div>
      <div>Phone number: ${newOrder.phoneNumber}</div>
      <div>Street: ${newOrder.addressLine1}</div>
      <div>Suburb: ${newOrder.addressLine2}</div>
      <div>City: ${newOrder.city}</div>
      <div>Province: ${newOrder.province}</div>
      <div>Postal code: ${newOrder.postalCode}</div>
    </div>
      <p style="font-size:12px; line-height:20px; margin-top: 25px;">
        <a href="https://www.mellowyellow.co.za" style="font-family:sans-serif;text-decoration:none; cursor: pointer;">
          www.mellowyellow.co.za
        </a>
      </p>
    </div>
  </body>
</html>

    `
}
