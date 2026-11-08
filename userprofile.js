import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { auth, db } from "./firebase-app.js";

const fields = {
  displayName: document.getElementById('profileDisplayName'),
  pronouns: document.getElementById('profilePronouns'),
  major: document.getElementById('profileMajor'),
  year: document.getElementById('profileYear'),
  bio: document.getElementById('profileBio'),
  interests: document.getElementById('profileInterests'),
  location: document.getElementById('profileLocation')
};

const headline = document.getElementById('profileHeadline');
const subtitle = document.getElementById('profileSubtitle');
const profileStatus = document.getElementById('profileStatus');
const profileForm = document.getElementById('profileForm');
const profileAvatar = document.getElementById('profileAvatar');

const defaultProfile = {
  displayName: 'Legonite',
  pronouns: '',
  major: '',
  year: '',
  bio: '',
  interests: '',
  location: ''
};

function setStatus(message, tone) {
  profileStatus.textContent = message || '';
  profileStatus.className = 'profile-status';
  if (tone) profileStatus.classList.add(tone);
}

function initialsFromName(name) {
  const clean = (name || 'Legonite').trim();
  if (!clean) return 'L';
  return clean
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() || '')
    .join('') || 'L';
}

function applyProfileData(profile) {
  const merged = { ...defaultProfile, ...profile };
  const name = merged.displayName || 'Legonite';

  Object.entries(fields).forEach(([key, input]) => {
    input.value = merged[key] || '';
  });

  headline.textContent = name;
  subtitle.textContent = [merged.major, merged.year].filter(Boolean).join(' • ') || 'University of Ghana student';
  profileAvatar.textContent = initialsFromName(name);
}

function getProfilePayload() {
  const profile = {};
  Object.entries(fields).forEach(([key, input]) => {
    profile[key] = (input.value || '').trim();
  });
  return profile;
}

function getNameFromUser(user) {
  return user?.displayName || user?.email?.split('@')[0] || 'Legonite';
}

let currentUser = null;
let userDocRef = null;

onAuthStateChanged(auth, async function (user) {
  if (!user) {
    window.location.href = 'htmldiary.html';
    return;
  }

  currentUser = user;
  userDocRef = doc(db, 'users', user.uid);

  try {
    const snap = await getDoc(userDocRef);
    const profileData = snap.exists() ? snap.data() : {};
    const merged = {
      ...defaultProfile,
      ...profileData,
      displayName: profileData.displayName || getNameFromUser(user)
    };
    applyProfileData(merged);
  } catch (error) {
    console.error('Could not load profile:', error);
    applyProfileData({ ...defaultProfile, displayName: getNameFromUser(user) });
    setStatus('Could not load your saved profile yet.', 'error');
  }
});

profileForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  if (!currentUser || !userDocRef) {
    setStatus('Please sign in again to save your profile.', 'error');
    return;
  }

  const cleanProfile = getProfilePayload();
  cleanProfile.displayName = cleanProfile.displayName || getNameFromUser(currentUser);

  const payload = {
    ...cleanProfile,
    email: currentUser.email || '',
    uid: currentUser.uid,
    updatedAt: serverTimestamp()
  };

  try {
    setStatus('Saving your profile…', '');
    await setDoc(userDocRef, payload, { merge: true });
    applyProfileData(cleanProfile);
    setStatus('Profile saved successfully.', 'success');
  } catch (error) {
    console.error('Could not save profile:', error);
    setStatus('Could not save your profile. Try again.', 'error');
  }
});

applyProfileData(defaultProfile);
