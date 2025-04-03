import { Component, OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { IonContent, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonList } from '@ionic/angular/standalone';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [IonList, IonButton, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonItem, IonContent, CommonModule, FormsModule, HeaderComponent, HttpClientModule],
})
export class DashboardPage implements OnInit {

  books: any;
  apiurl = 'http://127.0.0.1:8000';
  http = inject(HttpClient);

  constructor(http:HttpClient) { }

  ngOnInit() {
    this.getBooks();
  }

  async getBooks() {
    this.http.get(this.apiurl + '/api/get_books_details').subscribe((res:any) => {
      this.books = res.return_data_set_1;
    });
  }

}
