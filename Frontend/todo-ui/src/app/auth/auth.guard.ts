import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import * as jwtDecode from "jwt-decode";
import { AppContext } from "../app.context";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private appContext: AppContext) { }

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
    this.appContext.accessToken = token;
    this.appContext.userName = decoded.user_name
    
    if (decoded.exp > Math.round((new Date()).getTime() / 1000)) {
      return true;
    }

    localStorage.removeItem("accessToken");
    this.router.navigate(["/login"]);
    return false;
  }
}
