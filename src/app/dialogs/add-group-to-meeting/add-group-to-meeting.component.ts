import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/apis/api.service';
import { Group } from 'src/app/models/group';
import { GroupToMeetingComponent } from 'src/app/models/group-to-meeting';
import {startWith, map} from 'rxjs/operators';

@Component({
  selector: 'app-add-group-to-meeting',
  templateUrl: './add-group-to-meeting.component.html',
  styleUrls: ['./add-group-to-meeting.component.css']
})
export class AddGroupToMeetingComponent implements OnInit {

  membershipForm= new FormGroup({
    groupName: new FormControl(''),
  }) 
  
  notAdded !: Group[];
  filteredGroups !: Observable<Group[]>;
  idGroupSelected!: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private apiService : ApiService,
              public dialogRef: MatDialogRef<GroupToMeetingComponent>) {}

  ngOnInit() {
    this.getAllNotAdded(this.data.idMeeting);
    
  }

  _filter = (name: string): Group[] => {
    const filterValue = name.toLowerCase();
  
    return this.notAdded.filter(item => item.name.toLowerCase().indexOf(filterValue) === 0);
  };
  
  writeResult(group: Group){
    this.idGroupSelected = group.id 
    return group.name;
  }

  private getAllNotAdded(idMeeting: number){
    this.apiService.getAllNotAdded(idMeeting).subscribe(
      (response) => {
        console.log(response);
        this.notAdded = response;
        this.filteredGroups = this.membershipForm.controls.groupName.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.notAdded.slice())
          );
      },
      (error) => {
        this.dialogRef.close(error);
      }
    )
  }

    onSubmit(){
      this.addGroupToMeeting(this.membershipForm.value)
    }

    addGroupToMeeting(group: GroupToMeetingComponent){
      group.idMeeting = this.data.idMeeting;
      
      this.apiService.addGroupToMeeting(group).subscribe(
        (response) => {
          this.dialogRef.close(response)
        },
        (error) => {
          this.dialogRef.close(error)
        }
      )
    }
}
