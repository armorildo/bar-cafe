import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from './store/app.state';
import { loadBusinessData } from './store/bar-cafe-data/bar-cafe-data.actions';
import { isLoading } from './store/bar-cafe-data/bar-cafe-data.selectors';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bar-cafe';
  isLoading: boolean = true;

  constructor(private store$: Store<State>,) {
    this.store$
      .pipe(select(isLoading))
      .subscribe((data) => {
        this.isLoading = data;
      });
  }

  ngOnInit() {
    // this.store$.dispatch(loadBusinessData())
  }
}
