import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import * as jwtDecode from "jwt-decode";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let token = localStorage.getItem("accessToken");

    if (!token) {
      this.router.navigate(["/login"]);
      return false;
    }

    var decoded: any = jwtDecode(token);
    if (decoded.exp < Date.now()) {
      return true;
    } else {
      localStorage.setItem("accessToken", null);
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
