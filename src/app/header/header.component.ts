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
        this.businessName = data.businessName;
        this.businessLogo = "data:image/png;base64, " + data.logo;
      });
  }

  ngOnInit(): void {
  }

  changeTheme() {
    document.body.classList.toggle('dark-mode');
  }
}
