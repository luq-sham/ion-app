import { Component, OnInit ,inject,CUSTOM_ELEMENTS_SCHEMA,ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.page.html',
  styleUrls: ['./add-books.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [HttpClientModule, IonicModule, HeaderComponent, CommonModule, FormsModule]
})
export class AddBooksPage implements OnInit {
  apiurl = 'http://127.0.0.1:8000';
  http = inject(HttpClient);

  constructor(
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.generateYears();
  }

  book = {
    title: '',
    author: '',
    published_year: '',
    book_id: null,
    genre:'',
    price: null,
  };

  Genre = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Biography', 'History', 'Romance', 'Thriller', 'Horror'];
  yearsList: number[] = [];

  generateYears() {
    const startYear = 1970;
    const currentYear = new Date().getFullYear();
    
    this.yearsList = Array.from({ length: currentYear - startYear + 1 }, (_, i) => currentYear - i);
  }

  onSubmit() {
    if (this.book.title && this.book.author && this.book.published_year && this.book.book_id && this.book.genre && this.book.price) {
      this.http.post(this.apiurl + '/api/post_add_book', this.book).subscribe((res: any) => {
        if (res.status_code == '200') {
          this.customHeaderMessageOKAlert('Error', 'Please fill all the required fields.');
        }
      })
    } else {
      this.customHeaderMessageOKAlert('Error', 'Please fill all the required fields.');
      console.warn(this.book);
    }
  }

  async confirmSubmit() {
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

    if (role == 'confirm') {
      this.onSubmit(); 
    }else{
      console.log('Book submission cancelled');
    }

  }

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
}
