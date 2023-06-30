import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent, HomeComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, HomeComponent],
})
export class CoreModule {}
