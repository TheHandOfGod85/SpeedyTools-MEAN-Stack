import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [NavbarComponent, HomeComponent, NotFoundComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, HomeComponent, NotFoundComponent],
})
export class CoreModule {}
