import * as functions from 'firebase-functions/v1';
import { db } from '../admin';

interface User {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: boolean;
}

// TODO convert to 2nd gen once auth triggers are supported
export const triggerAuthUserCreate = functions
  .region('northamerica-northeast1')
  .auth.user()
  .onCreate(async (user) => {
    const { uid, email, displayName }: User = user;

    // Create a new document with the user's UID
    const userRef = db.collection('users').doc(uid);

    // Set the document data
    const userData = {
      email: email,
      displayName: displayName,
    };

    // Save the user data in Firestore
    try {
      await userRef.set(userData);
      console.log(`👤✅ user created successfully: ${uid}`);
    } catch (error) {
      console.error(`👤❌ error creating user: ${error}`);
    }
  });
