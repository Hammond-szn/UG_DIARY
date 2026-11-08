import { after, before, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment
} from "@firebase/rules-unit-testing";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  addDoc
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

const projectId = "demo-ugdiary-local";
let testEnvironment;

before(async function () {
  testEnvironment = await initializeTestEnvironment({
    projectId,
    firestore: {
      rules: readFileSync(new URL("../firestore.rules", import.meta.url), "utf8")
    },
    storage: {
      rules: readFileSync(new URL("../storage.rules", import.meta.url), "utf8")
    }
  });
});

beforeEach(async function () {
  await testEnvironment.clearFirestore();
  await testEnvironment.clearStorage();
});

after(async function () {
  await testEnvironment.cleanup();
});

test("authenticated students can publish valid campus posts", async function () {
  const db = testEnvironment.authenticatedContext("student-1").firestore();
  await assertSucceeds(addDoc(collection(db, "posts"), {
    authorId: "student-1",
    category: "Campus",
    campus: "University of Ghana",
    text: "Testing a campus post",
    votes: {},
    upvotes: 0,
    downvotes: 0,
    createdAt: serverTimestamp()
  }));
});

test("students cannot publish posts as another account", async function () {
  const db = testEnvironment.authenticatedContext("student-1").firestore();
  await assertFails(addDoc(collection(db, "posts"), {
    authorId: "student-2",
    category: "Campus",
    campus: "University of Ghana",
    text: "This should be rejected",
    votes: {},
    upvotes: 0,
    downvotes: 0,
    createdAt: serverTimestamp()
  }));
});

test("profiles are readable only by their owner", async function () {
  await testEnvironment.withSecurityRulesDisabled(async function (context) {
    await setDoc(doc(context.firestore(), "users", "student-1"), {
      uid: "student-1",
      email: "student@example.edu",
      updatedAt: new Date()
    });
  });

  const ownerDb = testEnvironment.authenticatedContext("student-1").firestore();
  const otherDb = testEnvironment.authenticatedContext("student-2").firestore();
  await assertSucceeds(getDoc(doc(ownerDb, "users", "student-1")));
  await assertFails(getDoc(doc(otherDb, "users", "student-1")));
});

test("users can create a chat room after checking that it does not exist", async function () {
  const db = testEnvironment.authenticatedContext("student-1").firestore();
  const roomRef = doc(db, "chatRooms", "campus-room");

  await assertSucceeds(getDoc(roomRef));
  await assertSucceeds(setDoc(roomRef, {
    name: "Campus Circle",
    participants: ["student-1"],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }));
  await assertSucceeds(getDoc(roomRef));
});

test("image uploads are restricted to the signed-in user's storage path", async function () {
  const ownerStorage = testEnvironment.authenticatedContext("student-1").storage();
  const otherStorage = testEnvironment.authenticatedContext("student-2").storage();
  const image = new Uint8Array([1, 2, 3]);

  await assertSucceeds(uploadBytes(
    ref(ownerStorage, "users/student-1/images/test.jpg"),
    image,
    { contentType: "image/jpeg" }
  ));
  await assertFails(uploadBytes(
    ref(otherStorage, "users/student-1/images/other.jpg"),
    image,
    { contentType: "image/jpeg" }
  ));
});