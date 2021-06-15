import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/apis/api.service';
import { Meeting } from 'src/app/models/meeting';

@Component({
  selector: 'app-add-meeting-to-parishioner',
  templateUrl: './add-meeting-to-parishioner.component.html',
  styleUrls: ['./add-meeting-to-parishioner.component.css']
})
export class AddMeetingToParishionerComponent implements OnInit {

  constructor(private apiService: ApiService,
    public dialogRef: MatDialogRef<AddMeetingToParishionerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getPossibleMeetings(this.data.idParishioner);
  }

  meetings: Meeting[] = [];

  updateParishionerMeetingsForm = new FormGroup({
    id: new FormControl(''),
    meetings: new FormControl('')
  })

  private getPossibleMeetings(idParishioner: number){
    this.apiService.getParishionerPossibleMeetings(idParishioner).subscribe(
      (response) => {
        console.log(response)
        this.meetings = response
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
      console.log('elimino ' + $event.source.value.id)
      this.apiService.removeParishionerFromMeeting(this.data.idParishioner, $event.source.value.id).subscribe(
          (response) =>{
          },
          (error)=> {

          }
      );

    }else{
      //il controllo è false quindi chiamo l'api di aggiunta ad un gruppo
      //alla fine dell'api richiamo parishionerDetails
      let p  = {
        idParishioner: this.data.idParishioner,
        idMeeting: $event.source.value.id
      }
      console.log(p)
      this.apiService.addParishionerToMeeting(p).subscribe(
          (response) =>{

          },
          (error)=> {

          }
      );
      console.log('aggiungo ' + $event.source.value.id)
    }
  }
  }

  onSubmit() {
    this.dialogRef.close("SUCCESS");
  }

}
