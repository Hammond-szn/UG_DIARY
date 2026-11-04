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
