import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { PipesModule } from './pipes/pipes.module';
import { ServicesModule } from './services/services.module';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		ServicesModule,
		PipesModule
	],
	exports: [PipesModule]
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule)
			throw new Error('CoreModule has already been loaded. Import core module into AppModule only.');
	}
}
