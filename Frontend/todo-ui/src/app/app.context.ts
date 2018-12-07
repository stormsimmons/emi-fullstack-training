import { Injectable } from "@angular/core";

@Injectable({providedIn: "root"})
export class AppContext{
    public username: string
    public accessToken: string
}