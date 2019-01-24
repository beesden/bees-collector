import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FigureListPage } from "src/app/figure-list/figure-list.page";

const routes: Routes = [
	{
		path: '',
		component: FigureListPage,
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
