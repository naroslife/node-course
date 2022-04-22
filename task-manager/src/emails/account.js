const sgMail = require('@sendgrid/mail');

const apiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apiKey);

function sendWelcomeEmail(toEmail, name) {
    sgMail
        .send({
            to: toEmail,
            from: 'robi54321@gmail.com',
            subject: 'Welcome',
            text: `Welcome to Task Manager, ${name}!`,
        })
        .then((result) => {
            console.log('email sent');
        })
        .catch((err) => {
            console.log('email not sent', err);
        });
}

function sendGoodbyeEmail(toEmail, name) {
    sgMail.send({
        to: toEmail,
        from: 'robi54321@gmail.com',
        subject: 'Goodbye!',
        text: `Goodbye ${name} from Task Manager!`,
    });
}

module.exports = { sendWelcomeEmail, sendGoodbyeEmail };
