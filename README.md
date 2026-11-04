# Legon Loop

Legon Loop is a University of Ghana campus discussion feed built with Firebase
Authentication and Cloud Firestore.

## Run locally

From the project directory, start a local web server and leave its terminal
running:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/htmldiary.html`. If the server stops, the browser
will show `ERR_CONNECTION_REFUSED`; restart the command to continue.

## Configure Firestore

The app's posts and replies use the rules in `firestore.rules`. Deploy them to
the configured Firebase project after signing in with an account that has
permission to manage its Firestore rules:

```powershell
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules --project ugdiary-23249
```

Users must also be able to sign in with the Email/Password provider in Firebase
Authentication. Firestore access is limited to authenticated users; posts
cannot be edited or deleted, and votes and replies are validated by the rules.

The app includes Feed, Post, Requests, Inbox, and Conversation screens. Feed,
posting, voting, replies, and optional post locations use Firebase. Requests
and conversations are interactive UI previews with sample content only; they
do not create real connections or send/store messages.

If the feed or post form reports that Firebase denied access, the rules have not
been deployed to `ugdiary-23249` (or you deployed them to a different project).
Deploy the rules above, then reload the feed.

## Optional post maps

Location sharing is off by default. A user can opt in for an individual post;
the browser asks for location permission and the app rounds coordinates to
about 1 km before saving. Only the rounded grid-cell coordinates are attached
to the post; the Firestore rules reject unrounded decimal coordinates.
Readers can open its approximate Google Map area.

To enable embedded maps:

1. Create a Google Maps JavaScript API key in Google Cloud, enable the Maps
   JavaScript API, and set up billing as required by Google.
2. Restrict the key to the Maps JavaScript API and to the exact website
   referrers you use (for local development, `http://127.0.0.1:8765/*` and
   `http://localhost:8765/*`).
3. Replace the placeholder in `google-maps-config.js` with the restricted key.

The browser key is visible to site visitors; referrer and API restrictions are
important. Deploy the updated `firestore.rules` before publishing posts with
locations. Existing posts without a location remain valid.
