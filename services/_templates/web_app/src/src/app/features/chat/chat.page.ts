import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

interface Message {
  content: string;
  sender: string; // 'user' or 'bot'
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
export class ChatPage {
  public log = console.log;
  public messages: Message[] = [];
  public userMessage = '';

  constructor() {}

  sendMessage() {
    if (this.userMessage.trim().length > 0) {
      this.messages.push({ content: this.userMessage, sender: 'user' });
      // Here you would typically add a method to process the user message
      this.userMessage = ''; // Reset input field
    }
  }
}
