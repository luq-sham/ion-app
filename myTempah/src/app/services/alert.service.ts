import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController,
  ) { }

  async customHeaderMessageOKAlert(header: string, message: string, alertCSS?: string) {

    const alert = await this.alertController.create({
      cssClass: alertCSS,
      header: header,
      // subHeader: 'Subtitle',
      message: message,
      buttons: [{
        text: 'OK',
        role: 'confirm'
      }],

    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role;

  }

  async confirmAlert() {
    const alert = await this.alertController.create({
      header: 'Add Book',
      message: 'Are you sure you want to submit this book?',
      cssClass: 'my-custom-class',
      mode: 'md',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          id: 'cancel-button',
          handler: () => { }
        }, {
          text: 'Confirm',
          id: 'confirm-button',
          role: 'confirm',
          handler: () => { }
        }
      ]
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role;
  }
}
