import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthIntercetorService } from './auth/auth-interceptor.service';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthIntercetorService, multi: true }
  ]
})
export class CoreModule { }