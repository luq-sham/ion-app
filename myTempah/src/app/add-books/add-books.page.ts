import { Component, OnInit ,inject,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.page.html',
  styleUrls: ['./add-books.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [HttpClientModule, IonicModule, HeaderComponent, CommonModule, FormsModule]
})
export class AddBooksPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
