import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/apis/api.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  AddGroupForm = new FormGroup({
    name: new FormControl('')
  });
  constructor(private apiService : ApiService,
              public dialogRef: MatDialogRef<AddGroupComponent>) {

  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.addGroup()
  }

  addGroup(){
    this.apiService.createGroup(this.AddGroupForm.value).subscribe(
      (response) => {
        this.dialogRef.close(response)
      },
      (error) => {
        this.dialogRef.close(error)
      }
    )
  }

}
