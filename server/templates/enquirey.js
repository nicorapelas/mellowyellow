const keys = require('../config/keys').keys

module.exports = (newEnquirey) => {
  return `
  <html>
  <head>
    <title></title>
  </head>
  <body>
    <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
    <div>
      <img style="width:170px; margin-bottom: 15px;" src="http://cdn.mcauto-images-production.sendgrid.net/7c24a358626a9096/41a1f3c0-4f6f-4c1c-bc61-234be15a282f/636x209.png" alt="mellowyellow-logo" />
    </div>
        <div style="font-size:1rem; font-weight: 900;">Name:</div>
        <div>${newEnquirey.name}</div>
        <div style="font-size:1rem; font-weight: 900;">Email:</div>
        <div>${newEnquirey.email}</div>
        <div style="font-size:1rem; font-weight: 900;">Phone:</div>
        <div>${newEnquirey.phone}</div>
        <div style="font-size:1rem; font-weight: 900;">Message:</div>
        <div>${newEnquirey.message}</div>
    </div>
  </body>
</html>

    `
}
