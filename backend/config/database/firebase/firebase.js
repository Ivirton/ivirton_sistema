const { initializeApp } = require('firebase/app');
const { getAnalytics } = require('firebase/analytics');


const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const dbFirebaseStore = admin.firestore();

module.exports = dbFirebaseStore


