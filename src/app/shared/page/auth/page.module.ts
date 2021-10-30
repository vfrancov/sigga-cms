import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopComponent } from './top/top.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
	declarations: [
		TopComponent,
		NavbarComponent,
		FooterComponent,
		NavComponent,
		HeaderComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		TopComponent,
		NavbarComponent,
		FooterComponent,
		NavComponent,
		HeaderComponent
	]
})
export class PageModule { }
