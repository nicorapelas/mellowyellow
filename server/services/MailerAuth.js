const sendgrid = require('sendgrid')
const helper = sendgrid.mail
const keys = require('../config/keys').keys

class MailerSimple extends helper.Mail {
  constructor({ recipients }, content) {
    super()

    this.sgApi = sendgrid(keys.sendgrid.apiKey)
    this.from_email = new helper.Email('no-reply@cvcloud.com')
    this.subject = `CV Cloud - User authentication department`
    this.body = new helper.Content('text/html', content)
    this.recipients = this.formatAddresses(recipients)

    this.addContent(this.body)
    this.addClickTracking()
    this.addRecipients()
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return (
        new helper.Email(email) && new helper.Email('nicorapelas@outlook.com')
      )
    })
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings()
    const clickTracking = new helper.ClickTracking(true, true)

    trackingSettings.setClickTracking(clickTracking)
    this.addTrackingSettings(trackingSettings)
  }

  addRecipients() {
    const personalize = new helper.Personalization()
    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient)
    })
    this.addPersonalization(personalize)
  }

  async send() {
    try {
      const request = this.sgApi.emptyRequest(
        {
          method: 'POST',
          path: '/v3/mail/send',
          body: this.toJSON(),
        },
        `${new Date().toString()} mail sent -> "order"`
      )
      const response = await this.sgApi.API(request)
      return response
    } catch (err) {
      console.log(err)
      err.response.body.errors
    }
  }
}

module.exports = MailerSimple
