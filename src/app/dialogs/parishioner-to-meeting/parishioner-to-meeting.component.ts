import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Parishioner } from 'src/app/models/parishioner';
import { ApiService } from 'src/app/apis/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {startWith, map} from 'rxjs/operators';
import { Partecipant } from 'src/app/models/partecipants';

@Component({
  selector: 'app-parishioner-to-meeting',
  templateUrl: './parishioner-to-meeting.component.html',
  styleUrls: ['./parishioner-to-meeting.component.css']
})

export class ParishionerToMeetingComponent implements OnInit {

  parishionerToAddForm = new FormControl();
  
  notPartecipants !: Partecipant[];
  filteredParishioners!: Observable<Partecipant[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private apiService : ApiService,
              public dialogRef: MatDialogRef<ParishionerToMeetingComponent>) {}

  ngOnInit() {
    this.getAllNotPartecipants(this.data.idMeeting);
    console.log(this.notPartecipants);
  }

  ngDoCheck() {
    
    this.filteredParishioners = this.parishionerToAddForm.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.notPartecipants.slice())
      );
  }

  displayFn(parishioner: Parishioner): string {
    return parishioner && parishioner.name ? parishioner.name : '';
  }

  private _filter(name: string): Partecipant[] {
    const filterValue = name.toLowerCase();

    return this.notPartecipants.filter(notPartecipant => notPartecipant.parishioner.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit(idParishioner: number){
    this.addParishionerToMeeting(idParishioner)
  }

  addParishionerToMeeting(idParishioner: number){
    console.log("CONTENUTO DEL FORM " + this.parishionerToAddForm.value);
    let idMeeting: number = Number(this.data.idMeeting);
    this.apiService.addParishionerToMeeting({idParishioner, idMeeting}).subscribe(
      (response) => {
        this.dialogRef.close(response)
      },
      (error) => {
        this.dialogRef.close(error)
      }
    )
  }

  getAllNotPartecipants(idMeeting: number){
    this.apiService.getAllNotPartecipants(idMeeting).subscribe(
      (response) => {
        console.log(response);
        this.notPartecipants = response;
      },
      (error) => {
        this.dialogRef.close(error);
      }
    )
  }
}
