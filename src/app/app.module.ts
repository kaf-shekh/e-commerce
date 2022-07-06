import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeRoutingModule } from './components/home/home-routing.module';
import { AdminRoutingModule } from './components/admin/admin-routing.module';
import { AuthEffects } from './store/effects/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HomeEffects } from './components/home/store/effects/auth.effects';
import { AdminEffects } from './components/admin/store/effects/auth.effects';
import { reducers } from '.';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireAuthModule } from '@angular/fire/auth';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { metaReducers } from './reducers';
// import { EntityDataModule } from '@ngrx/data';
// import { entityConfig } from './entity-metadata';
// import { environment } from '../environments/environment';
// import { reducers, metaReducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([HomeEffects,AdminEffects,AuthEffects]),
    StoreModule.forRoot(reducers),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HomeRoutingModule,
    AdminRoutingModule,
    SharedModule,
    // EntityDataModule.forRoot(entityConfig),
    // StoreDevtoolsModule.instrument({
    //   logOnly: !environment.production, // Restrict extension to log-only mode
    // }),
    StoreDevtoolsModule.instrument(),
    // StoreModule.forRoot(reducers, {
    //   metaReducers
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
