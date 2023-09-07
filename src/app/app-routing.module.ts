import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login/login.component';
import { DasboardComponent } from './component/dashboard/dasboard/dasboard.component';
import { RegisterComponent } from './component/register/register/register.component';
import { VerifieEmailComponent } from './component/email/verifie-email/verifie-email.component';
import { ForgotPasswordComponent } from './component/mot de passe/forgot-password/forgot-password.component';
import { AjoutProspectComponent } from './component/ajout-prospect/ajout-prospect.component';
import { ListeProspectComponent } from './component/liste-prospect/liste-prospect.component';
import { ServiceComponent } from './component/service/service.component';
import { OffreComponent } from './component/offre/offre.component';
import { ActivitesuiviComponent } from './component/activitesuivi/activitesuivi.component';
import { EtatprocessusComponent } from './component/etatprocessus/etatprocessus.component';
import { CreateAccountComponent } from './component/create-account/create-account.component';
import { AfficheractiviteComponent } from './component/afficheractivite/afficheractivite.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component : LoginComponent},
  {path:'afficheractivite/:prospectId', component : AfficheractiviteComponent},
  {path:'register', component : RegisterComponent},
  {path:'verifie-email', component : VerifieEmailComponent},
  {path:'forgot-password', component : ForgotPasswordComponent},
  {path:'dashboard', component : DasboardComponent, children: [
    {path:'ajout-prospect', component : AjoutProspectComponent},
    {path:'liste-prospect', component : ListeProspectComponent},
    {path:'service', component : ServiceComponent},
    {path:'offre', component : OffreComponent},
    {path:'activitesuivi', component : ActivitesuiviComponent},
    {path:'etatprocessus', component : EtatprocessusComponent},
    {path:'create-account', component : CreateAccountComponent},
   
  
  ]},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
