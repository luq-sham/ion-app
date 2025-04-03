import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true, // Ensure it's a standalone component if using standalone APIs
  imports: [IonicModule], // Remove individual component imports
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
