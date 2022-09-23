import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../store/app.state';
import { getBusinessData } from '../store/bar-cafe-data/bar-cafe-data.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private store$: Store<State>) {
  }

  ngOnInit(): void {
  }

  changeTheme() {
    document.body.classList.toggle('dark-mode');
  }

}
