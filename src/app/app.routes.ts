import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {ModulosComponent} from "./components/modulos/modulos.component";


export const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'modulos', component: ModulosComponent},
  {path:'**', component:PageNotFoundComponent}
];
