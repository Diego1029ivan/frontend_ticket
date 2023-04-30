import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authServices: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authServices.isAuthenticated()) {
      if (this.isTokenExpirado()) {
        this.authServices.logout();
        this.router.navigate(['/auth']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/auth']);
    return false;
  }

  isTokenExpirado(): boolean {
    let token = sessionStorage.getItem('token') as string;
    let payload = this.authServices.obtenerDatosToken(token);
    let now = new Date().getTime() / 1000;
    if (payload.exp < now) {
      return true;
    }
    return false;
  }
}
