import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './layout.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { MiniCartComponent } from '../features/components/mini-cart/mini-cart.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    NavigationComponent,
    MiniCartComponent
  ],
  exports: [
    LayoutComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class LayoutModule { }
