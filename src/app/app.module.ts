import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CoreModule } from './core.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CoreModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    DashboardModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
