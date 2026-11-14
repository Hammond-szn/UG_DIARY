import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { connectAuthEmulator, getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { connectFirestoreEmulator, getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { connectStorageEmulator, getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { firebaseConfig } from "./firebase-config.js";

const isLocalhost = ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);
const usesEmulators = isLocalhost
  && new URLSearchParams(window.location.search).get("emulator") === "1";
const app = initializeApp(usesEmulators
  ? {
      ...firebaseConfig,
      projectId: "demo-ugdiary-local",
      storageBucket: "demo-ugdiary-local.appspot.com"
    }
  : firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

if (usesEmulators) {
  connectAuthEmulator(auth, "http://127.0.0.1:19099", { disableWarnings: true });
  connectFirestoreEmulator(db, "127.0.0.1", 18080);
  connectStorageEmulator(storage, "127.0.0.1", 19199);
}