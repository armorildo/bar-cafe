
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { MenuRoutingModule } from './menu-routing.module';


@NgModule({
  declarations: [
    MenuItemComponent,
    MenuHeaderComponent,
    MenuComponent
  ],
  imports: [
    MenuRoutingModule,
    CommonModule
  ],
})
export class MenuModule {
}
