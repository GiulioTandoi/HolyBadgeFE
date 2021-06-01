import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../apis/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AdditionalInfoInput} from "../../models/additional-info-input";

@Component({
  selector: 'app-add-additional-info',
  templateUrl: './add-additional-info.component.html',
  styleUrls: ['./add-additional-info.component.css']
})
export class AddAdditionalInfoComponent implements OnInit {

  addParishionerInfoForm = new FormGroup({
    infoName: new FormControl(''),
    infoValue: new FormControl('')
  });
  constructor(private apiService : ApiService,
              public dialogRef: MatDialogRef<AddAdditionalInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.addAdditionalInfoParishioner()
  }

  addAdditionalInfoParishioner(){
    let body: AdditionalInfoInput={
      idParishioner: this.data.idParishioner,
      infoName: this.addParishionerInfoForm.value.infoName,
      infoValue: this.addParishionerInfoForm.value.infoValue
    }


    this.apiService.addAdditionalInfoToParishioner(body).subscribe(
      (response) => {
        this.dialogRef.close(response)
      },
      (error) => {
        this.dialogRef.close(error)
      }
    )
  }
}
