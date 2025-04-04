import { Component, OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { IonContent, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonList, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [IonCol, IonRow, IonGrid, IonButton, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, CommonModule, FormsModule, HeaderComponent, HttpClientModule],
})
export class DashboardPage implements OnInit {

  books: any;

  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.getBooks();
  }

  async getBooks() {
    return this.apiService.getBooks().subscribe((res:any) => {
      this.books = res.return_data_set_1;
    });
  }

}
