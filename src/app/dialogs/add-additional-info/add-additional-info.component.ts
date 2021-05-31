import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../apis/api.service";
import {MatDialogRef} from "@angular/material/dialog";
import {AdditionalInfo} from "../../models/additional-info";

@Component({
  selector: 'app-add-additional-info',
  templateUrl: './add-additional-info.component.html',
  styleUrls: ['./add-additional-info.component.css']
})
export class AddAdditionalInfoComponent implements OnInit {
  addParishionerInfoForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl('')
  });
  constructor(private apiService : ApiService,
              public dialogRef: MatDialogRef<AddAdditionalInfoComponent>) {

  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.addAdditionalInfoParishioner()
  }

  addAdditionalInfoParishioner(){
    this.apiService.addAdditionalInfoToParishioner(this.addParishionerInfoForm.value).subscribe(
      (response) => {
        this.dialogRef.close(response)
      },
      (error) => {
        this.dialogRef.close(error)
      }
    )
  }
}
