import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ParishionerAccess} from "../models/parishioner-access";
import {Observable} from "rxjs";
import {Parishioner} from "../models/parishioner";
import {Meeting} from "../models/meeting";
import {Group} from "../models/group";
import {ParishionerInput} from "../models/parishioner-input";
import {AdditionalInfo} from "../models/additional-info";
import {ParishionerDetail} from "../models/parishioner-detail";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://api-holybadge.lazydev.fun:81/holybadge/';
  constructor(private httpClient: HttpClient) { }

  public login(login: any){
    return this.httpClient.post(this.url + "authenticate", login)
  }

  public getAccess() : Observable<ParishionerAccess[]>{
    return this.httpClient.get<ParishionerAccess[]>(this.url + "homepage", {headers: this.AuthHeader()})
  }

  public getParishioners() : Observable<Parishioner[]>{
    return this.httpClient.get<Parishioner[]>(this.url + "parishioners", {headers: this.AuthHeader()})
  }

  public getMeetings() : Observable<Meeting[]>{
    return this.httpClient.get<Meeting[]>(this.url + "meetings", {headers: this.AuthHeader()})
  }

  public getGroups() : Observable<Group[]>{
    return this.httpClient.get<Group[]>(this.url + "groups", {headers: this.AuthHeader()})
  }

  public addParishioner(input : ParishionerInput){
    return this.httpClient.post(this.url + "createParishioner", input, {headers: this.AuthHeader()})
  }

  public addAdditionalInfoToParishioner(input : AdditionalInfo){
    return this.httpClient.post(this.url + "addAdditionalInfoToParishioner", input, {headers: this.AuthHeader()})
  }

  public getParishionerDetails(id : number) : Observable<ParishionerDetail>{
    return this.httpClient.get<ParishionerDetail>(this.url + "parishionerDetails?idParishioner="+ id.toString(), {headers: this.AuthHeader()})
  }

  public AuthHeader(): any{
    return new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
  }
}
