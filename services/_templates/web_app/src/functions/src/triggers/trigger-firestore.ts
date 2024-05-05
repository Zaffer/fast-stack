import {
  onDocumentCreated,
  onDocumentUpdated,
} from 'firebase-functions/v2/firestore';
import { admin, db } from '../admin';
import OpenAI from 'openai';
import { firestore } from 'firebase-admin';
import { FirestoreThread } from '../chatbot/types';

/**
 * Triggered when a new user is created.
 *
 * Creates a thread on OpenAI and a thread document in Firestore.
 */
export const onUserCreated = onDocumentCreated('users/{uid}', async (event) => {
  const snapshot = event.data;
  if (!snapshot) return console.log('no data for event');

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    // create thread on OpenAI
    const thread = await openai.beta.threads.create();
    console.log('🧵🤖✅ created thread on OpenAI: ', thread);

    // create thread document in Firestore
    await snapshot.ref
      .collection('threads')
      .doc(thread.id)
      .set({
        threadId: thread.id,
      } as FirestoreThread);
    console.log('🧵🔥✅ created thread in Firestore: ', thread.id);
  } catch (error) {
    console.error('🧵❌ error creating thread:', error);
    return Promise.reject(error);
  }
});

/**
 * Triggered when a new summary is created.
 *
 * Sends a message to the topic of the company that the summary is for.
 */
export const onSummaryCreated = onDocumentCreated(
  'summaries/{docId}',
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) return console.log('No data associated with the event');

    // create message
    const data = snapshot.data();
    const messagePayload = {
      notification: {
        title: 'News for ' + data.company_name,
        body: data.text,
      },
    };

    // send message to topic
    try {
      const responseSend = await admin
        .messaging()
        .sendToTopic(data.company_id, messagePayload);
      console.log('successfully sent message to topic:', responseSend);
      return null;
    } catch (error) {
      console.error('error sending message:', error);
      return Promise.reject(error);
    }
  }
);

/**
 * Triggered when a new company is created.
 *
 * Creates a followings document for each user that follows the theme.
 */
export const onThemeFollowed = onDocumentUpdated(
  'users/{userId}/portfolios/{themeId}',
  async (event) => {
    // Get the before and after document snapshots
    const snapshot = event.data;
    if (!snapshot) return console.log('No data associated with the event');
    const newValue = snapshot.after.data();
    const previousValue = snapshot.before.data();

    // check if the followed status has changed
    if (newValue.followed !== previousValue.followed) {
      console.log(
        `Theme '${event.params.themeId}' followed status changed to: ${newValue.followed}`
      );

      if (newValue.followed === true) {
        // get all companies that have the theme being followed
        const companiesRef = db
          .collection('companies')
          .where(
            'follow_suggestions.themes',
            'array-contains',
            event.params.themeId
          );
        const companiesSnapshot = await companiesRef.get();

        // create a followings document for each company
        companiesSnapshot.forEach(async (doc) => {
          console.log(`Creating followings document for company '${doc.id}'`);

          const followingsDoc = db
            .collection('followings')
            .doc(`${doc.id}|${event.params.userId}`);

          await followingsDoc.set({
            company_id: doc.id,
            created_at: firestore.FieldValue.serverTimestamp(),
            is_followed: true,
            is_notified: false,
            user_id: event.params.userId,
          });
        });
      }
    }
  }
);

/**
 * Triggered when notifications are toggled for a following.
 *
 * Subscribes or unsubscribes the user from the company topic.
 */
export const onNotificationsToggled = onDocumentUpdated(
  'followings/{docId}',
  async (event) => {
    // Get the document snapshots
    const snapshot = event.data;
    if (!snapshot) return console.log('No data associated with the event');
    const newData = snapshot.after.data();

    // get registration tokens from the user document
    const userRef = db
      .collection('users')
      .doc(event.params.docId.split('|')[1]);
    const userSnapshot = await userRef.get();
    const userData = userSnapshot.data();
    if (!userData) return console.log('No user data found');
    const registrationTokens = userData.registrationTokens;
    if (!registrationTokens)
      return console.log('No registration tokens found for user');

    // subscribe or unsubscribe the user from the company topic
    if (newData.is_notified === true) {
      // subscribe the devices corresponding to the registration tokens to the topic
      try {
        const responseSubscribe = await admin
          .messaging()
          .subscribeToTopic(registrationTokens, newData.company_id);
        console.log('successfully subscribed to topic:', responseSubscribe);
        return null;
      } catch (error) {
        console.error('error subscribing to topic:', error);
        return Promise.reject(error);
      }
    } else {
      // unsubscribe the devices corresponding to the registration tokens from the topic
      try {
        const responseUnsubscribe = await admin
          .messaging()
          .unsubscribeFromTopic(registrationTokens, newData.company_id);
        console.log(
          'successfully unsubscribed from topic:',
          responseUnsubscribe
        );
        return null;
      } catch (error) {
        console.error('error unsubscribing from topic:', error);
        return Promise.reject(error);
      }
    }
  }
);
