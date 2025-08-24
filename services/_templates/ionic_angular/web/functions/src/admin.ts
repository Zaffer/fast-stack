// import { initializeApp, App } from 'firebase-admin/app';
// import { getFirestore } from 'firebase-admin/firestore';
// import admin = require("firebase-admin")
import * as admin from 'firebase-admin';


// initializeApp({credential: credential.applicationDefault());
// const app: App = admin.initializeApp();
admin.initializeApp();

// const db = getFirestore(app);
export const db = admin.firestore();
export { admin };