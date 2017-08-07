import { NgModule } from '@angular/core';
import { TestPipe } from './../pipes/test/test';
@NgModule({
	declarations: [TestPipe],
	imports: [],
	exports: [TestPipe]
})
export class PipesModule {}
