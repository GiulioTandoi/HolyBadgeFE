import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }

  public isAuthenticated(): string {
    // @ts-ignore
    let token :string = localStorage.getItem('token');
    if(token == null){
      return "";
    }
    const tokenContent =this.jwtHelper.decodeToken(token);
    let role: string = tokenContent.role;
    let isExpired : boolean = this.jwtHelper.isTokenExpired(token);
    if(isExpired)
      role = "";
    return role;

  }
}
