import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{ AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { DasboardComponent } from './component/dashboard/dasboard/dasboard.component';
import { VerifieEmailComponent } from './component/email/verifie-email/verifie-email.component';
import { LoginComponent } from './component/login/login/login.component';
import { RegisterComponent } from './component/register/register/register.component';
import { ForgotPasswordComponent } from './component/mot de passe/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AjoutProspectComponent } from './component/ajout-prospect/ajout-prospect.component';
import { ListeProspectComponent } from './component/liste-prospect/liste-prospect.component';
import { ServiceComponent } from './component/service/service.component';
import { OffreComponent } from './component/offre/offre.component';
import { ActivitesuiviComponent } from './component/activitesuivi/activitesuivi.component';
import { EtatprocessusComponent } from './component/etatprocessus/etatprocessus.component';
import { CreateAccountComponent } from './component/create-account/create-account.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AfficheractiviteComponent } from './component/afficheractivite/afficheractivite.component';


@NgModule({
  declarations: [
    AppComponent,
    DasboardComponent,
    VerifieEmailComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    AjoutProspectComponent,
    ListeProspectComponent,
    ServiceComponent,
    OffreComponent,
    ActivitesuiviComponent,
    EtatprocessusComponent,
    CreateAccountComponent,
    ActivitesuiviComponent,
    AfficheractiviteComponent
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
