import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../apis/api.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-parishioner',
  templateUrl: './add-parishioner.component.html',
  styleUrls: ['./add-parishioner.component.css']
})
export class AddParishionerComponent implements OnInit {
  addParishionerForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    phoneNumber: new FormControl(''),
    note: new FormControl('')
  });
  constructor(private apiService : ApiService,
              public dialogRef: MatDialogRef<AddParishionerComponent>) {

  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.addParishioner()
  }

  addParishioner(){
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
