import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss']
})
export class MenuHeaderComponent implements OnInit {
  @Input() menuItems: Category[] | undefined;
  @Input() selectedItem: Category | undefined;
  @Output() menuChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  changeMenu(item: string) {
    this.menuChanged.emit(item);
  }
}
