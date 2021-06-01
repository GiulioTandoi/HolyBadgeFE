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
import { MeetingInput } from '../models/meeting-input';
import { GroupToMeeting } from '../models/group-to-meeting';
import { ParishionerToMeeting } from '../models/parishioner-to-meeting';
import { GroupInput } from '../models/group-input';
import { UserCredentials } from '../models/user-credentials';
import {AdditionalInfoInput} from "../models/additional-info-input";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'https://api-holybadge.lazydev.fun:81/holybadge/';
  constructor(private httpClient: HttpClient) { }

  public login(login: any){
    return this.httpClient.post(this.url + "authenticate", login)
  }

  public getAccess() : Observable<ParishionerAccess[]>{
    return this.httpClient.get<ParishionerAccess[]>(this.url + "homepage", {headers: this.AuthHeader()})
  }

  public registerEntrance(idParishioner: number) : Observable<string>{
    return this.httpClient.get<string>(this.url + "registerEntrance?idParishioner=" + idParishioner.toString(), {headers: this.AuthHeader()})
  }
  
  public registerExit(idParishioner: number) : Observable<string>{
    return this.httpClient.get<string>(this.url + "registerExit?idParishioner=" + idParishioner.toString(), {headers: this.AuthHeader()})
  }
  
  public registerUser(input : UserCredentials) {
    return this.httpClient.post(this.url + "registerUser", input, {headers: this.AuthHeader()})
  }

  // ========================== CHIAMATE PER PARISHIONERS ================================================
  public getParishioners() : Observable<Parishioner[]>{
    return this.httpClient.get<Parishioner[]>(this.url + "parishioners", {headers: this.AuthHeader()})
  }

  public addParishioner(input : ParishionerInput){
    return this.httpClient.post(this.url + "createParishioner", input, {headers: this.AuthHeader()})
  }

  public addAdditionalInfoToParishioner(input : AdditionalInfoInput){
    return this.httpClient.post(this.url + "addAdditionalInfo", input, {headers: this.AuthHeader()})
  }
  public modifyParishioner (input : Parishioner){
    return this.httpClient.post(this.url + "modifyParishioner", input, {headers: this.AuthHeader()})
  }

  public addAdditionalInfoToParishioner(input : AdditionalInfo){
    return this.httpClient.post(this.url + "addAdditionalInfoToParishioner", input, {headers: this.AuthHeader()})
  }

  public addAdditionalInfoToAll(input : AdditionalInfo){
    return this.httpClient.post(this.url + "addAdditionalInfoToAll", input, {headers: this.AuthHeader()})
  }

  public getParishionerDetails(id : number) : Observable<ParishionerDetail>{
    return this.httpClient.get<ParishionerDetail>(this.url + "parishionerDetails?idParishioner="+ id.toString(), {headers: this.AuthHeader()})
  }

  public removeParishioner (id: number){
    return this.httpClient.delete(this.url + "removeParishioner?idParishioner=" + id.toString(), {headers: this.AuthHeader()})
  }

  public removeParishionerAdditionalInfo (id: number, idAdditionalInfo : number){
    return this.httpClient.delete(this.url + "removeParishioner?idParishioner=" + id.toString() + "&idAdditionalInfo=" + idAdditionalInfo, {headers: this.AuthHeader()})
  }
  // ===============================================================================

  // ======================================================== CHIAMATE MEETINGS =========================================================
  public getMeetings() : Observable<Meeting[]>{
    return this.httpClient.get<Meeting[]>(this.url + "meetings", {headers: this.AuthHeader()})
  }

  public getMeetingPartecipants() : Observable<Parishioner[]>{
    return this.httpClient.get<Parishioner[]>(this.url + "meetings", {headers: this.AuthHeader()})
  }

  public addMeeting(input : MeetingInput){
    return this.httpClient.post(this.url + "createMeeting", input, {headers: this.AuthHeader()})
  }

  public addGroupToMeeting(input : GroupToMeeting){
    return this.httpClient.post(this.url + "addGroupToMeeting", input, {headers: this.AuthHeader()})
  }

  public addParishionerToMeeting(input : ParishionerToMeeting){
    return this.httpClient.post(this.url + "addParishionerToMeeting", input, {headers: this.AuthHeader()})
  }

  public modifyMeeting(input : Meeting){
    return this.httpClient.post(this.url + "modifyMeeting", input, {headers: this.AuthHeader()})
  }

  public removeParishionerFromMeeting (idParishioner : number , idMeeting: number){
    return this.httpClient.delete(this.url + "removeParishionerFromMeeting?idParishioner=" + idParishioner.toString() + "&idMeeting=" + idMeeting, {headers: this.AuthHeader()})
  }

  public removeGroupFromMeeting (idGroup : number , idMeeting: number){
    return this.httpClient.delete(this.url + "removeGroupFromMeeting?idParishioner=" + idGroup.toString() + "&idMeeting=" + idMeeting, {headers: this.AuthHeader()})
  }

  public deleteMeeting (idMeeting: number){
    return this.httpClient.delete(this.url + "deleteMeeting?idMeeting=" + idMeeting, {headers: this.AuthHeader()})
  }
  //===============================================================================
  
  //========================================================= CHIAMATE GROUPS ============================================================
  
  public getGroups() : Observable<Group[]>{
    return this.httpClient.get<Group[]>(this.url + "groups", {headers: this.AuthHeader()})
  }

  public getGroupMemebers(idGroup: number) : Observable<Parishioner[]>{
    return this.httpClient.get<Parishioner[]>(this.url + "groupsMembers?idGroup=" + idGroup.toString(), {headers: this.AuthHeader()})
  }

  public createGroup(input : GroupInput){
    return this.httpClient.post(this.url + "createGroup", input, {headers: this.AuthHeader()})
  }

  public addParishionerToGroup(input : ParishionerToMeeting){
    return this.httpClient.post(this.url + "addParishionerToGroup", input, {headers: this.AuthHeader()})
  }

  public modifyGroup(input : Group){
    return this.httpClient.post(this.url + "modifyGroup", input, {headers: this.AuthHeader()})
  }

  public removeParishionerFromGroup (idParishioner : number , idGroup: number){
    return this.httpClient.delete(this.url + "removeParishionerFromGroup?idParishioner=" + idParishioner.toString() + "&idGroup=" + idGroup, {headers: this.AuthHeader()})
  }

  public deleteGroup (idGroup : number){
    return this.httpClient.delete(this.url + "deleteGroup?idGroup=" + idGroup.toString(), {headers: this.AuthHeader()})
  }
  // ===============================================================================


  public registerEntrance(id: number){
    return this.httpClient.get(this.url + "registerEntrance?idParishioner=" + id.toString(), {headers: this.AuthHeader(), responseType:'text'})
  }

  public registerExit(id: number){
    return this.httpClient.get(this.url + "registerExit?idParishioner=" + id.toString(), {headers: this.AuthHeader(), responseType:'text'})
  }

  public AuthHeader(): any{
    return new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
  }
}
