import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  AuthService: any;
  router: any;
  canActivate(): any
   
  {
      if(!this.AuthService.getToken()) {
        this.router.navigate(['/login']);
      }
      return this.AuthService.getToken();
    }
    
}
