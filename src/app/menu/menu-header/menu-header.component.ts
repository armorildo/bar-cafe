import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  @ViewChild('menuStrip', { static: true })
  menuStrip!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  changeMenu(event: any, item: string) {
    console.log('event', event.target.offsetLeft)
    console.log('menu strip', this.menuStrip)
    this.menuStrip.nativeElement.scrollTo({
      top: 0,
      left: event.target.offsetLeft - 10,
      behavior: 'smooth'
    })
    this.menuChanged.emit(item);
  }
}
