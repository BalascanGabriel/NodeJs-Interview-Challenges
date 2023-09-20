const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

const smtpConfigurations = {
  'yahoo.com': {
    service: 'Yahoo',
    auth: {
      user: process.env.YAHOO_USER, // Use environment variables
      pass: process.env.YAHOO_PASS, // Use environment variables
    },
  },
};

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded form data

app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Send Email</h1>
        <form method="post" action="/send-email">
          <label for="recipientEmail">Recipient Email:</label>
          <input type="email" id="recipientEmail" name="recipientEmail" required><br><br>
          <label for="emailContent">Email Content:</label>
          <textarea id="emailContent" name="emailContent" required></textarea><br><br>
          <button type="submit">Send Email</button>
        </form>
      </body>
    </html>
  `);
});

app.post('/send-email', async (req, res) => {
  try {
    const recipientEmail = req.body.recipientEmail;
    const domain = recipientEmail.split('@')[1];

    if (!smtpConfigurations[domain]) {
      return res.status(400).send('SMTP configuration not available for this domain');
    }

    const emailContent = req.body.emailContent;

    const mailOptions = {
      from: smtpConfigurations[domain].auth.user,
      to: recipientEmail,
      subject: 'Your Email Subject',
      text: emailContent,
    };

    const transporter = nodemailer.createTransport(smtpConfigurations[domain]);
    await transporter.sendMail(mailOptions);

    res.send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
