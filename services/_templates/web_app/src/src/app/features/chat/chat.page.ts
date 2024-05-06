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
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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
} from '@ionic/angular/standalone';
import { Users } from 'src/app/core/models/users';
import { Messages } from 'src/app/core/models/messages';

interface Message {
  content: string;
  sender: string; // 'user' or 'bot'
}
interface Item {
  name: string;
}

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
  ],
})
export class ChatPage implements OnInit {
  // TODO send message on enter key press

  private firestore: Firestore = inject(Firestore);
  // messages$: Observable<Messages[]>;
  usersCol: CollectionReference | undefined;
  usersDoc: DocumentReference | undefined;

  public messages: Message[] = [];
  public userMessage = '';

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
    if (this.userMessage.trim().length > 0) {
      const messagesCol = collection(this.firestore, 'users/', '1ZrStjcBlXcpDLv9xxZy', 'threads', 'thread_NWvCaojlpjWlDI9uebgGsoD7', 'messages');

      const newMessage: Messages = {
        prompt: this.userMessage
      };

      this.messages.push({ content: this.userMessage, sender: 'user' });

      addDoc(messagesCol, newMessage).then((docRef: DocumentReference) => {
        console.log("Message added with ID: ", docRef.id);
      }).catch(error => {
        console.error("Error adding message: ", error);
      });

    }

    this.userMessage = ''; // Reset input field
  }
}
