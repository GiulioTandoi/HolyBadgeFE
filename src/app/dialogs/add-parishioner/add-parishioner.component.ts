import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../apis/api.service";
import {MatDialogRef} from "@angular/material/dialog";
import { MatOptionSelectionChange } from '@angular/material/core';
import { Group } from 'src/app/models/group';
import { Meeting } from 'src/app/models/meeting';

@Component({
  selector: 'app-add-parishioner',
  templateUrl: './add-parishioner.component.html',
  styleUrls: ['./add-parishioner.component.css']
})
export class AddParishionerComponent implements OnInit {

  groups: Group[] = []

  meetings: Meeting [] = []
  
  groupsSelected: Array<number>[] = []

  meetingsSelected: Array<number> [] = []

  addParishionerForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    phoneNumber: new FormControl(''),
    note: new FormControl(''),
    secondPhone: new FormControl(''),
    dataNascita: new FormControl(''),
    allergiePatologie: new FormControl(''),
    tagliaMaglietta: new FormControl(''),
    partecipations: new FormControl(''),
    memberships: new FormControl('')
  });
  constructor(private apiService : ApiService,
              public dialogRef: MatDialogRef<AddParishionerComponent>) {

  }

  ngOnInit(): void {
    this.getAllMeetings();
    this.getAllGroups();
  }

  private getAllMeetings(){
    this.apiService.getMeetings().subscribe(
      (response) => {
        console.log(response)
        this.meetings = response
      },
      (error) => {
        console.log(error)
      }
    )
  }

  private getAllGroups(){
    this.apiService.getGroups().subscribe(
      (response) => {
        console.log(response)
        this.groups = response
      },
      (error) => {
        console.log(error)
      }
    )
  }

  onSelectionChangeMeetings($event: MatOptionSelectionChange) {
    console.log($event)
    if($event.isUserInput){
      if(!$event.source.selected){
        //il controllo è true quindi chiamo l'api di eliminazione  dal gruppo
        //alla fine dell'api richiamo parishionerDetails
        delete this.meetingsSelected[$event.source.value.id];
        console.log('elimino')
        

      }else{
        //il controllo è false quindi chiamo l'api di aggiunta ad un gruppo
        //alla fine dell'api richiamo parishionerDetails
        this.meetingsSelected.push($event.source.value.id);
        console.log('aggiungo')
      }
    }
  }

  onSelectionChangeGroups($event: MatOptionSelectionChange) {
    console.log($event)
    if($event.isUserInput){
      if(!$event.source.selected){
        //il controllo è true quindi chiamo l'api di eliminazione  dal gruppo
        //alla fine dell'api richiamo parishionerDetails
        delete this.groupsSelected[$event.source.value.id];
        console.log('elimino ' + $event.source.value.id)

      }else{
        //il controllo è false quindi chiamo l'api di aggiunta ad un gruppo
        //alla fine dell'api richiamo parishionerDetails
        this.groupsSelected.push($event.source.value.id);
        console.log('aggiungo ' + $event.source.value.id)
      }
    }
  }

  onSubmit(){
    this.addParishioner()
  }

  addParishioner(){

    this.addParishionerForm.controls.partecipations.setValue(this.meetingsSelected);
    this.addParishionerForm.controls.memberships.setValue(this.groupsSelected);
    console.log("VALORE FORM AGGIUNTA " + this.addParishionerForm.controls.groups);
    
    this.apiService.addParishioner(this.addParishionerForm.value).subscribe(
      (response) => {
        this.dialogRef.close(response)
      },
      (error) => {
        this.dialogRef.close(error)
      }
    )
  }
}
