import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { ReceiptItem } from '../models/receipt-item';
import { DialogService } from '../services/dialog.service';
import { State } from '../store/app.state';
import { getBusinessData } from '../store/bar-cafe-data/bar-cafe-data.selectors';
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  //slide up animation for components
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
  //dialog reference for the receipt modal
  receiptDialogRef: MatDialogRef<any> | undefined;
  //template for the receipt modal
  @ViewChild('receiptModal', { static: true })
  receiptModal!: TemplateRef<any>;

  //dialog reference for the success modal
  successDialogRef: MatDialogRef<any> | undefined;
  //template for the success modal
  @ViewChild('successModal', { static: true })
  successModal!: TemplateRef<any>;

  // menu bar items
  menuBar: Category[] = [];
  // selected menu item
  selectedMenu: Category | undefined;
  // product list of the selected menu
  currentProducts: Product[] = [];
  // array of colors for the elements of the product list
  colorArray: string[] = [];
  // list of elements to be displayed in the receipt modal
  receiptList: ReceiptItem[] = [];

  constructor(private store$: Store<State>, private dialogService: DialogService) {
    this.store$
      .pipe(select(getBusinessData))
      .subscribe((data) => {
        this.menuBar = data.categories;
        // on init, make selected menu the first item of the menu bar
        this.selectedMenu = data.categories[0];
        // on init, make current products the items of selected menu
        this.currentProducts = data.categories[0]?.products;
        // generate colors for the menu elements
        this.colorize();
      });
  }

  ngOnInit(): void {
    // this.store$.dispatch(loadBusinessData())
  }
  // update current products and colors when the selected menu is changed
  updateSelectedMenu(id: string) {
    this.selectedMenu = this.menuBar.find((item) => item.id === id);
    this.currentProducts = this.selectedMenu?.products!;
    this.colorize();
  }

  // function to check if a product is in the receipt list
  isItemSelected(item: string) {
    return this.receiptList.find(element => element.name === item) ? true : false;
  }

  // function to add or remove a product from the receipt list
  addRemoveProduct(event: any, item: any) {
    if (event.target.checked) {
      this.addToReceipt(item);
    }
    else {
      this.removeFromReceipt(item);
    }
  }
  // function to add product to receipt list
  addToReceipt(item: Product) {
    let newItem: ReceiptItem = {
      name: item.name,
      unitPrice: item.unitPrice,
      quantity: '1'
    }
    this.receiptList = [...this.receiptList, newItem];
  }

  // function to remove product from the receipt list
  removeFromReceipt(item: Product) {
    this.receiptList = this.receiptList.filter((el) => el.name !== item.name);
  }

  // update the sum of price for a product based on applied quantity and then updates total sum
  updateSums(event: any, item: ReceiptItem) {
    console.log('number update', event)
    item.quantity = event.target.value;
    this.calcTotal();
  }

  // function to update the total sum of the receipt
  calcTotal(): string {
    let sum = 0;
    for (let item of this.receiptList) {
      sum += +item.quantity * +item.unitPrice;
    }
    return sum.toString();
  }

  // function to open the receipt modal
  openReceiptModal() {
    this.receiptDialogRef = this.dialogService.openStandardDialog({
      titleCaption: '',
    },
      this.receiptModal);
    this.receiptDialogRef?.afterClosed().subscribe((success) => {
      // if user decides to proceed with the receipt, open the success modal and empty the receipt list
      if (success) {
        this.openSuccessModal();
        this.receiptList = [];
      }
    })
  }

  // close the receipt dialog and then pass 'true' if the user decides to proceed with the receipt, 
  // or 'false' if the user does not want to proceed with the bill,
  // to the receipt modal afterClosed() event
  onReceiptDialogClose(success: boolean) {
    this.receiptDialogRef?.close(success);
  }

  // opens success modal
  openSuccessModal() {
    this.successDialogRef = this.dialogService.openStandardDialog({
      titleCaption: '',
      body: {}
    },
      this.successModal);
  }

  // function to generate a new random color for each element in the currentProducts array.
  // the colors generated are mostly warm and bright colors
  colorize() {
    if (this.currentProducts) {
      this.colorArray = []
      for (let el of this.currentProducts) {
        this.colorArray = [... this.colorArray, "hsl(" + Math.random() * 360 + ", 100%, 75%)"]
      }
    }
  }
}