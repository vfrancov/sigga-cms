import { Routes } from "@angular/router";
import { AforoComponent } from "./components/aforo/aforo.component";
import { TrackingComponent } from "./components/tracking/tracking.component";
import { IndexReportesComponent } from "./index/index.component";

export const reportRoutes: Routes = [
	{ path: 'general', component: IndexReportesComponent },
	{ path: 'aforo', component: AforoComponent },
	{ path: 'tracking', component: TrackingComponent }
]
