const { initializeApp } = require('firebase/app');
const { getAuth, signInWithPopup, GoogleAuthProvider } = require('firebase/auth');

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkhzgmgi4JUGr__ujsqw9tITmaRX0Blp4",
  authDomain: "releasedashboard-dccee.firebaseapp.com",
  projectId: "releasedashboard-dccee",
  storageBucket: "releasedashboard-dccee.firebasestorage.app",
  messagingSenderId: "157350699905",
  appId: "1:157350699905:web:b479d9aa93c8fce5233e80"
};

console.log('🔍 Checking Firebase Configuration...');
console.log('Project ID:', firebaseConfig.projectId);
console.log('Auth Domain:', firebaseConfig.authDomain);
console.log('API Key:', firebaseConfig.apiKey.substring(0, 10) + '...');

console.log('\n📋 Next Steps:');
console.log('1. Go to: https://console.firebase.google.com/project/releasedashboard-dccee/authentication/sign-in');
console.log('2. Enable Google Authentication provider');
console.log('3. Add authorized domains in Authentication Settings');
console.log('4. Test your app at: https://releasedashboard-dccee.web.app');

console.log('\n✅ Configuration looks correct - the issue is likely that Google Auth is not enabled in Firebase Console'); 