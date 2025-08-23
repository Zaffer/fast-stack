import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Firestore,
  collectionData,
  collection,
  CollectionReference,
  addDoc,
  DocumentReference,
  serverTimestamp,
  doc,
  getDocs,
  docData,
  query,
  orderBy,
  onSnapshot,
  limit,
} from '@angular/fire/firestore';
import { EMPTY, Observable } from 'rxjs';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonRow,
  IonCol,
  IonSpinner,
  IonNote,
} from '@ionic/angular/standalone';
import { Users } from 'src/app/core/models/users';
import { Message, State } from 'src/app/core/models/messages';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonFooter,
    IonInput,
    IonButton,
    IonRow,
    IonCol,
    IonSpinner,
    IonNote,
  ],
})
export class ChatPage implements OnInit {
  // TODO send message on enter key press
  // TODO style messages with markdown

  private firestore: Firestore = inject(Firestore);
  // messages$: Observable<Messages[]>;
  private usersCol: CollectionReference | undefined;
  private usersDoc: DocumentReference | undefined;
  private threadsDoc: DocumentReference | undefined;

  messages: Message[] = [];
  currentMessage: Message = {};
  userInput = '';
  processing = false;

  constructor() {
    // // Create the user document
    // TODO connect authentication, create user on auth user create, pull in user id from auth here, and retrieve latest thread.
    this.usersCol = collection(this.firestore, 'users');
    addDoc(this.usersCol, <Users>{
      createTime: serverTimestamp(),
    })
      .then((docRef) => {
        this.usersDoc = docRef;
        console.log('user: ', this.usersDoc.id);
      })
      .catch((error) => {
        console.error('error creating user document: ', error);
      });
  }

  ngOnInit() {}

  async sendMessage() {
    // prevent bad user input
    if (!(this.userInput.trim().length > 0)) {
      this.userInput = '';
      return;
    }

    // limit total number of messages and alert user with a popup
    if (this.messages.length >= 5) {
      alert('Messages limit reached. Please book a consultation to continue.');
      console.error('too many messages');

      this.userInput = '';
      return;
    }

    this.processing = true;
    this.currentMessage = {
      prompt: this.userInput,
    };
    this.userInput = '';

    // get the thread created by the user creation trigger cloud function
    if (!this.threadsDoc) {
      if (this.usersDoc) {
        const threadsCol = collection(
          this.firestore,
          `${this.usersDoc.path}/threads`
        );
        const threadsQuery = query(threadsCol, limit(1));
        await getDocs(threadsQuery)
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              this.threadsDoc = querySnapshot.docs[0].ref;
              console.log('thread: ', this.threadsDoc?.id);
            } else {
              console.error('no thread created yet');
              this.processing = false;
              this.userInput = '';
              return;
            }
          })
          .catch((error) => {
            console.error('error retrieving thread:', error);
          });
      } else {
        console.error('user not created yet');
        this.processing = false;
        this.userInput = '';
        return;
      }
    }

    if (this.threadsDoc) {
      const messagesCol = collection(
        this.firestore,
        this.threadsDoc.path,
        'messages'
      );
      addDoc(messagesCol, this.currentMessage)
        .then((docRef: DocumentReference) => {
          console.log('message: ', docRef.id);
          this.processResponse(docRef);
        })
        .catch((error) => {
          console.error('error adding message: ', error);
        });
    }
  }

  processResponse(docRef: DocumentReference) {
    onSnapshot(docRef, (doc) => {
      const updatedMessage = { ...(doc.data() as Message) };

      if (updatedMessage.status?.state === State.COMPLETED) {
        this.messages.push(updatedMessage);
        this.currentMessage = {};
        this.processing = false;
      } else {
        this.currentMessage.response = updatedMessage.response;
      }
    });
  }
}
