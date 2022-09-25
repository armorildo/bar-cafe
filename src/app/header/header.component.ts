import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { State } from '../store/app.state';
import { loadBusinessData } from '../store/bar-cafe-data/bar-cafe-data.actions';
import { getBusinessData } from '../store/bar-cafe-data/bar-cafe-data.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  businessName: string = '';
  businessLogo: any | undefined;

  constructor(private store$: Store<State>, private domSanitizer: DomSanitizer) {
    this.store$
      .pipe(select(getBusinessData))
      .subscribe((data) => {
        //get business name and logo from the state
        this.businessName = data.businessName;
        //since the retrieved image is a base64 string, we must add a little extra overhead to use it as a 
        //src attribute for the image element
        this.businessLogo = "data:image/png;base64, " + data.logo;
      });
  }

  ngOnInit(): void {
  }

  // function that toggles the dark-mode class on the BODY DOM element
  changeTheme() {
    document.body.classList.toggle('dark-mode');
  }
}
