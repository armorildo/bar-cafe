
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuHeaderComponent } from './menu-header/menu-item.component';
import { MenuRoutingModule } from './menu-routing.module';


@NgModule({
  declarations: [
    MenuItemComponent,
    MenuHeaderComponent,
    MenuComponent
  ],
  imports: [
    MenuRoutingModule
  ],
})
export class MenuModule {
}
