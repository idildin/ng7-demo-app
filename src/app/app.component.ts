import { Component } from '@angular/core';
import { AuthService } from './services';
import { Router, RouterOutlet } from '@angular/router';
import { FadeInAnimation } from './shared/animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    FadeInAnimation
  ]
})
export class AppComponent {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }

  logout() {
    this.auth.logout();

    this.router.navigate(['login']);
  }
}
