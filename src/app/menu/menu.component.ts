import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { ReceiptItem } from '../models/receipt-item';
import { DialogService } from '../services/dialog.service';
import { State } from '../store/app.state';
import { loadBusinessData } from '../store/bar-cafe-data/bar-cafe-data.actions';
import { getBusinessData } from '../store/bar-cafe-data/bar-cafe-data.selectors';
import { animate, AnimationEvent, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('400ms ease-in', style({ transform: 'translateY(0%)' }))
      ])
    ])
  ]
})
export class MenuComponent implements OnInit {
  receiptDialogRef: MatDialogRef<any> | undefined;
  @ViewChild('receiptModal', { static: true })
  receiptModal!: TemplateRef<any>;

  successDialogRef: MatDialogRef<any> | undefined;
  @ViewChild('successModal', { static: true })
  successModal!: TemplateRef<any>;

  menuBar: Category[] = [];
  selectedMenu: Category | undefined;
  currentProducts: Product[] = [];
  colorArray: string[] = [];
  receiptList: ReceiptItem[] = [];

  constructor(private store$: Store<State>, private dialogService: DialogService) {
    this.store$
      .pipe(select(getBusinessData))
      .subscribe((data) => {
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
    this.colorize();
  }

  isItemSelected(item: string) {
    return this.receiptList.find(element => element.name === item) ? true : false;
  }

  addRemoveProduct(event: any, item: any) {
    if (event.target.checked) {
      this.addToReceipt(item);
    }
    else {
      this.removeFromReceipt(item);
    }
  }

  addToReceipt(item: Product) {
    let newItem: ReceiptItem = {
      name: item.name,
      unitPrice: item.unitPrice,
      quantity: '1'
    }
    this.receiptList = [...this.receiptList, newItem];
  }

  removeFromReceipt(item: Product) {
    this.receiptList = this.receiptList.filter((el) => el.name !== item.name);
  }

  updateSums(event: any, item: ReceiptItem) {
    console.log('number update', event)
    item.quantity = event.target.value;
    this.calcTotal();
  }

  calcTotal(): string {
    let sum = 0;
    for (let item of this.receiptList) {
      sum += +item.quantity * +item.unitPrice;
    }
    return sum.toString();
  }

  openReceiptModal() {
    this.receiptDialogRef = this.dialogService.openStandardDialog({
      titleCaption: '',
      body: {
        products: this.receiptList
      }
    },
      this.receiptModal);
    this.receiptDialogRef?.afterClosed().subscribe((success) => {
      if (success) {
        this.openSuccessModal();
        this.receiptList = [];
      }
    })
  }

  onReceiptDialogClose(success: boolean) {
    this.receiptDialogRef?.close(success);
  }

  openSuccessModal() {
    this.successDialogRef = this.dialogService.openStandardDialog({
      titleCaption: '',
      body: {}
    },
      this.successModal);
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

