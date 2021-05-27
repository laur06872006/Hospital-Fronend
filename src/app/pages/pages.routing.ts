import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { PerfilComponent } from "./perfil/perfil.component";
// Guard
import { AuthGuard } from "../guards/auth.guard";

const ROUTES: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'DashBoard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Barra Progreso' } },
            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Graficas' } },
            { path: 'account-setting', component: AccountSettingsComponent, data: { titulo: 'Temas' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Uso de RXJS' } },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil Usuario' } },
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(ROUTES)
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule { }