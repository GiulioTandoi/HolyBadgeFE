import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  groupToAddForm: FormGroup = this._formBuilder.group({
    parishGroups: '',
  });
  
  parishGroups !: Group[];
  groupToAdd !: Observable<Group[]>;

  constructor(private _formBuilder: FormBuilder,
              private apiService : ApiService,
              public dialogRef: MatDialogRef<GroupToMeetingComponent>) {}

  ngOnInit() {
    this.groupToAdd = this.groupToAddForm.get('parishGroups')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }

  _filter = (opt: string[], value: string): string[] => {
    const filterValue = value.toLowerCase();
  
    return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  };

  private _filterGroup(value: string): Group[] {
    if (value) {
      return this.parishGroups
        .map(parishgroup => ({id: parishgroup.id, name: parishgroup.name}))
        .filter(parishgroup => parishgroup.name.length > 0);
    }

    return this.parishGroups;
  }

    onSubmit(){
      this.addGroupToMeeting()
    }

    addGroupToMeeting(){
      this.apiService.addGroupToMeeting(this.groupToAddForm.value).subscribe(
        (response) => {
          this.dialogRef.close(response)
        },
        (error) => {
          this.dialogRef.close(error)
        }
      )
    }
}
