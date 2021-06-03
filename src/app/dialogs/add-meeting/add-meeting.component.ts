import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/apis/api.service';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit {

  AddMeetingForm = new FormGroup({
    meetingName: new FormControl(''),
    date: new FormControl(''),
    location: new FormControl('')
  });
  constructor(private apiService : ApiService,
              public dialogRef: MatDialogRef<AddMeetingComponent>) {

  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.addMeeting()
  }

  addMeeting(){
    this.apiService.addMeeting(this.AddMeetingForm.value).subscribe(
      (response) => {
        this.dialogRef.close(response)
      },
      (error) => {
        this.dialogRef.close(error)
      }
    )
  }

}
