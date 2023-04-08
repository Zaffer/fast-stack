import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  loadingActive: HTMLIonLoadingElement;

  constructor(public toastCtlr: ToastController,
    public loadingCtlr: LoadingController,
  ) { }


  // Toaster
  async toastPresent(message: string, color: string) {
    const toast = await this.toastCtlr.create({
      message: message,
      color: color,
      duration: 2000
    })
    toast.present();
  }

  // Loader
  async loadingPresent(message = "Loading events...") {
    if (!this.loadingActive) {
      this.loadingActive = await this.loadingCtlr.create({
        message
      });
    }
    await this.loadingActive.present();
  }

  async loadingDismiss() {
    if (this.loadingActive) {
      await this.loadingActive.dismiss();
    }
  }
}
