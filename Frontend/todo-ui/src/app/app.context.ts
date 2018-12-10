import { Injectable } from "@angular/core";

@Injectable({providedIn: "root"})
export class AppContext{
    public userName: string
    public accessToken: string
}