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
  private firestore: Firestore = inject(Firestore);
  // messages$: Observable<Messages[]>;
  usersCol: CollectionReference;
  usersDoc: DocumentReference | undefined;

  public messages: Message[] = [];
  public userMessage = '';

  constructor() {
    console.log('before: ', this.usersDoc);
    this.usersCol = collection(this.firestore, 'users');
    addDoc(this.usersCol, <Users>{
      createTime: serverTimestamp(),
    })
      .then((docRef) => {
        this.usersDoc = docRef;
        console.log('after: ', this.usersDoc.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });

    // this.messages$ = collectionData(this.usersCollection) as Observable<Messages[]>;
  }

  ngOnInit() {
    this.fetchAllUsers();
  }

  async fetchAllUsers() {
    const usersCol = collection(this.firestore, 'users');
    const snapshot = await getDocs(usersCol);
    snapshot.forEach(doc => {
      console.log(doc.id, ' => ', doc.data());
    });
  }

  sendMessage() {
    if (this.userMessage.trim().length > 0) {
      this.messages.push({ content: this.userMessage, sender: 'user' });
      console.log('User: ', this.usersDoc?.firestore.toJSON());
      // Threads.Messages.Prompt
    }

    this.userMessage = ''; // Reset input field
  }
}
