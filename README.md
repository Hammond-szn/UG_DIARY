# Legon Loop

Legon Loop is a University of Ghana campus discussion feed built with Firebase
Authentication and Cloud Firestore.

## Open locally

Open `htmldiary.html` in VS Code and choose **Open with Live Server**. The app
uses the configured Firebase project by default, including when served from
`localhost`. Make sure Email/Password sign-in is enabled and the Firebase rules
are deployed.

## Run and test with emulators

Use Node.js 22 LTS and a compatible Java runtime for the Firestore emulator.
Install the project tools once with `npm install`.

For isolated browser testing, start the Firebase Auth, Firestore, and Storage
emulators in one terminal:

```powershell
npm run emulators
```

In a second terminal, start the static web server:

```powershell
npm run serve
```

Open `http://127.0.0.1:8765/htmldiary.html?emulator=1`. Emulators are used only
when this query parameter is present on a localhost URL. Create an account
through the app for a local test user. Stop both terminals when finished.

Run the Firestore and Storage rules tests with:

```powershell
npm test
```

The test command starts the required emulators for the test run and shuts them
down afterward. The Firebase CLI may require a compatible Java runtime for the
Firestore emulator.

## Configure Firestore

The app's posts, replies, chat messages, and media uploads use the rules in
`firestore.rules` and `storage.rules`. Deploy both to the configured Firebase
project after signing in with an account that has permission to manage them:

```powershell
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules,storage --project ugdiary-23249
```

For cloud testing, enable Email/Password in Firebase Authentication, create
Firestore, enable Storage, and deploy the rules to a dedicated test Firebase
project where possible. The app uses the configured Firebase project by
default; the local browser app uses emulators only with `?emulator=1`.
Firestore access is limited to authenticated users; posts cannot be edited or
deleted, and votes and replies are validated by the rules.

The app includes Feed, Post, Requests, Inbox, and Conversation screens. Posts
support camera/gallery photos and recorded voice notes; replies and chat
messages support recorded voice notes. Media is stored in Firebase Storage,
and the Firestore documents contain the media URLs. Voice recording requires
microphone permission and a secure browser context (localhost is supported).
Requests and sample inbox entries remain previews.

If the feed, post form, or media upload reports that Firebase denied access,
the Firestore or Storage rules may not be deployed to `ugdiary-23249` (or may
have been deployed to a different project). Deploy both rulesets above, then
reload the app. Firebase Storage must also be enabled for the project.

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
