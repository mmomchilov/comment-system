import { Component } from '@angular/core';
import { FirstPageComponent } from './firstPage/firstPage.component';

import { SecondPageComponent } from './secondPage/secondPage.component';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // constructor(private router: Routes) {
  //   console.log(this.router);
  // }

  title = 'Comment-system';

  page = 'firstPage';
  // page = 'secondPage';

}
