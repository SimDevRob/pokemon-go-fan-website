/**
 * A HACKd.design server component to get data from Google API
 * @author {email} rob@hackd.design
 * 2016 MIT 
 */

  ////////
 /// DB Connection
////////

/**
 * Declaring connection to the database
 */
let knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./hackd.poktig"
  }
});
let bookshelf = require('bookshelf')(knex);

let express = require('express');
let router = express.Router();
let fs = require('fs');
let readline = require('readline');
let google = require('googleapis');
let googleAuth = require('google-auth-library');

module.exports = router;


    ///////
   // Google OAuth2
  ///////

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
let SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
let TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
let TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Google Calendar API.
  authorize(JSON.parse(content), listEvents);
});
 
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  let clientSecret = credentials.installed.client_secret;
  let clientId = credentials.installed.client_id;
  let redirectUrl = credentials.installed.redirect_uris[0];
  let auth = new googleAuth();
  let oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}
/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  let authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}
/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}
/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

    ////////
   /// A P I
  ////////

/**
 * Makes a call to googleapis and lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  let calendar = google.calendar('v3');
  calendar.events.list({
    auth: auth,
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    let events = response.items;
    if (events.length == 0) {
      console.log('No upcoming events found.');
    } else {
      console.log('Upcoming 10 events:');
      for (let i = 0; i < events.length; i++) {
        let event = events[i];
        let start = event.start.dateTime || event.start.date;
        console.log('%s - %s', start, event.summary);
      }
    }
  });
}
/**
 * 
 * Returns a calendar data object 
 * 
 * @param {google.auth.OAuth2} auth 
 * 
 */
function updateCalendarEvents(auth) {

  // Make a calendar query/object.  
  let calendar_hackd = google.calendar('v3');
  calendar_hackd.events.list({
    auth: auth,
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 1000,
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    return response.items;
  });
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Poke\'mon Online');
});
/**
 * Returns a JSON data object containing calendar events
 */
router.route('/calendar-data')
.get(function(req, res) {

  // Do Bookshelf Stuff
  
  let calendarData = bookshelf.Model.extend({
    tableName: 'calendar-events', 
    events: updateCalendarEvents 
  });
  res.json(calendarData);
res.send('Calendar Data Accessed');
})
.post(function(req, res) {
  
});


