import { Component, OnInit ,inject,CUSTOM_ELEMENTS_SCHEMA,ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../services/api.service';
import { AlertService } from '../services/alert.service';


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
    private apiService: ApiService,
    private alertService: AlertService,
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
          this.alertService.customHeaderMessageOKAlert('Success', 'Book added successfully!');
        }
      })
    } else {
      this.alertService.customHeaderMessageOKAlert('Error', 'Please fill all the required fields.');
      console.warn(this.book);
    }
  }

  confirmSubmit() {
    this.alertService.confirmAlert().then((res) => {
      if (res == 'confirm') {
        this.onSubmit();
      } else {
        console.log('cancelled');
      }
    });
  }
}
