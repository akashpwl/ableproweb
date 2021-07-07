import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  public i = 1;
  ngOnInit (): void {
    if (this.authService.user) {
      this.router.navigate(['/dashboard']);
    }

  }

}
