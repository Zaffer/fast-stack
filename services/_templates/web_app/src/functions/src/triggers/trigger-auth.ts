import * as functions from "firebase-functions/v1";
import { db } from "../admin";

interface User {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: boolean;
}

// TODO convert to v2
export const triggerAuthUserCreate = functions
  .region("us-central1")
  .auth.user()
  .onCreate(async (user) => {
    const { uid, email, displayName }: User = user;

    // Create a new document with the user's UID
    const userRef = db.collection("users").doc(uid);

    // Set the document data
    const userData = {
      email: email,
      displayName: displayName,
    };

    // Save the user data in Firestore
    try {
      await userRef
        .set(userData);
      console.log(`user created successfully: ${uid}`);
    } catch (error) {
      console.error(`error creating user: ${error}`);
    }

    // // create the user's messages_sent subcollection from all the docs in messages collection
    // const messagesRef = db.collection("messages");
    // const messagesSnapshot = await messagesRef.get();
    // const messagesDocs = messagesSnapshot.docs;
    // const portfoliosRef = userRef.collection("portfolios");
    // const batch = db.batch();
    // messagesDocs.forEach((doc) => {
    //   const portfolioRef = portfoliosRef.doc(doc.id);
    //   batch.set(portfolioRef, {
    //     name: doc.data().name,
    //     icon: doc.data().icon,
    //     description: doc.data().description,
    //     followed: false,
    //   });
    // }
    // );
    // try {
    //   await batch.commit();
    //   console.log(`portfolios created successfully: ${uid}`);
    // }
    // catch (error) {
    //   console.error(`error creating portfolios: ${error}`);
    // }

  });