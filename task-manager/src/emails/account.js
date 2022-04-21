const sgMail = require('@sendgrid/mail')

const apiKey =
  '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'
sgMail.setApiKey(apiKey)

function sendWelcomeEmail(toEmail, name) {
  sgMail.send({
    to: toEmail,
    from: 'robi54321@gmail.com',
    subject: 'Welcome',
    text: `Welcome to Task Manager, ${name}!`,
  })
}

function sendGoodbyeEmail(toEmail, name) {
  sgMail.send({
    to: toEmail,
    from: 'robi54321@gmail.com',
    subject: 'Goodbye!',
    text: `Goodbye ${name} from Task Manager!`,
  })
}

module.exports = { sendWelcomeEmail, sendGoodbyeEmail }
