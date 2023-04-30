import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((e) => {
        if (e.status == 401) {
          if (this.authService.isAuthenticated()) {
            this.authService.logout();
          }
          this.router.navigate(['/auth']);
        }

        if (e.status == 403) {
          let username = JSON.parse(sessionStorage.getItem('usuario') || '{}');
          swal.fire(
            'Acceso denegado',
            `Hola ${username.name} no tienes acceso a este recurso!`,
            'warning'
          );
          this.router.navigate(['/auth']);
        }
        return throwError(e);
      })
    );
  }
}
