import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { State } from '../store/app.state';
import { loadBusinessData } from '../store/bar-cafe-data/bar-cafe-data.actions';
import { getBusinessData } from '../store/bar-cafe-data/bar-cafe-data.selectors';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuBar: Category[] = [];
  selectedMenu: Category | undefined;
  currentProducts: Product[] = [];
  colorArray: string[] = [];

  constructor(private store$: Store<State>, private cdr: ChangeDetectorRef) {
    this.store$
      .pipe(select(getBusinessData))
      .subscribe((data) => {
        console.log('business data', data)
        this.menuBar = data.categories;
        this.selectedMenu = data.categories[0];
        this.currentProducts = data.categories[0]?.products;
        this.colorize();
      });
  }

  ngOnInit(): void {
    // this.store$.dispatch(loadBusinessData())
  }

  updateSelectedMenu(id: string) {
    this.selectedMenu = this.menuBar.find((item) => item.id === id);
    this.currentProducts = this.selectedMenu?.products!;
    console.log('selectedmenuitem', this.selectedMenu);
    this.colorize();
  }

  colorize() {
    if (this.currentProducts) {
      this.colorArray = []
      for (let el of this.currentProducts) {
        this.colorArray = [... this.colorArray, "hsl(" + Math.random() * 360 + ", 100%, 75%)"]
      }
    }
  }
}

