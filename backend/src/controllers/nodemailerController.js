/* eslint-disable spaced-comment */
/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-inner-declarations */
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');

const { CLIENT_ID, REFRESH_TOKEN, CLIENT_SECRET, REDIRECT_URI, FRONT_URL, USER_EMAIL } =
  process.env;

const send = async (email, subject, text) => {
  try {
    if (email) {
      const OAuthClient = google.auth.OAuth2;
      const oAuth2Client = new OAuthClient(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
      );
      oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
      async function sendMail() {
        try {
          const accessToken = await oAuth2Client.getAccessToken();
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: USER_EMAIL,
              clientId: CLIENT_ID,
              clientSecret: CLIENT_SECRET,
              refreshToken: REFRESH_TOKEN,
              accessToken: accessToken,
            },
          });
          const mailOptions = {
            from: `Alkemy <${USER_EMAIL}>`,
            to: email,
            subject,
            text,
          };
          const result = await transporter.sendMail(mailOptions);
          return result;
        } catch (error) {
          return error;
        }
      }

      return sendMail()
        .then((res) => res)
        .catch((error) => error);
    }
  } catch (err) {
    return err;
  }
};


const confirmarMail = async (req, res) => {
  const { id, email } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({ message: 'Validate your account' });
    }
    const mailCode = uuidv4()
    console.log(mailCode, 'MAILCODE')
    await user.update({ mailCode });
    const subject = 'Confirm your email';
    const text = `Enter to te next link to confirm your email: ${FRONT_URL}/confirm/${id}?emailcode=${user.mailCode}`;
    const response = await send(email, subject, text);

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};


module.exports = {
  confirmarMail,
};
