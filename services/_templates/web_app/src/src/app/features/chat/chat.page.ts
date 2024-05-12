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
  IonNote
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

  messages: Message[] = [];
  currentMessage: Message = {};
  userInput = '';
  processing = false;

  constructor() {
    // // Create the user document
    // TODO connect authentication, create user on auth user create, pull in user id from auth here, and retrieve latest thread.
    // this.usersCol = collection(this.firestore, 'users');
    // addDoc(this.usersCol, <Users>{
    //   createTime: serverTimestamp(),
    // })
    //   .then((docRef) => {
    //     this.usersDoc = docRef;
    //     console.log('user: ', this.usersDoc.id);
    //   })
    //   .catch((error) => {
    //     console.error('Error adding document: ', error);
    //   });
    // this.messages$ = collectionData(this.usersCollection) as Observable<Messages[]>;
  }

  ngOnInit() {
    // this.fetchAllUsers();
    console.log(this.currentMessage);
  }

  // TODO remove this
  // async fetchAllUsers() {
  //   const usersCol = collection(this.firestore, 'users');
  //   const snapshot = await getDocs(usersCol);
  //   snapshot.forEach((doc) => {
  //     console.log(doc.id, ' => ', doc.data());
  //   });
  // }

  sendMessage() {
    if (!(this.userInput.trim().length > 0)) {
      this.userInput = '';
      return;
    }

    this.processing = true;
    this.currentMessage = {
      prompt: this.userInput
    };
    this.userInput = '';

    const messagesCol = collection(this.firestore, 'users/', '1ZrStjcBlXcpDLv9xxZy', 'threads', 'thread_NWvCaojlpjWlDI9uebgGsoD7', 'messages');
    addDoc(messagesCol, this.currentMessage).then((docRef: DocumentReference) => {
      console.log("Message added with ID: ", docRef.id);
      this.processResponse(docRef);
    }).catch(error => {
      console.error("Error adding message: ", error);
    });
  }

  processResponse(docRef: DocumentReference) {
    onSnapshot(docRef, (doc) => {
      const updatedMessage = { ...doc.data() as Message };

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
