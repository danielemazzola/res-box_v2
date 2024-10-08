const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2;

const OAUTH_CLIENTID = process.env.OAUTH_CLIENTID
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET
const OAUTH_REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN

const oauth2Client = new OAuth2(
  OAUTH_CLIENTID,
  OAUTH_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  refresh_token: OAUTH_REFRESH_TOKEN
});


module.exports = { oauth2Client }
