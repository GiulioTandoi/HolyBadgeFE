import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Parishioner } from 'src/app/models/parishioner';
import { ApiService } from 'src/app/apis/api.service';
import { MatDialogRef } from '@angular/material/dialog';

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-parishioner-to-meeting',
  templateUrl: './parishioner-to-meeting.component.html',
  styleUrls: ['./parishioner-to-meeting.component.css']
})
export class ParishionerToMeetingComponent implements OnInit {

  parishionerToAddForm: FormGroup = this._formBuilder.group({
    propertyOfParishioner: '',
  });
  
  parishionerToAdd !: Observable<Parishioner[]>;

  constructor(private _formBuilder: FormBuilder,
              private apiService : ApiService,
              public dialogRef: MatDialogRef<ParishionerToMeetingComponent>) {}

  ngOnInit() {
    this.parishionerToAdd = this.parishionerToAddForm.get('propertyOfParishioner')!.valueChanges
//      .pipe(
//        startWith(''),
//        map(value => this._filterParishioner(value))
//      );
  }

//  private _filterParishioner(value: string): Parishioner[] {
//    if (value) {
//      return this.parishionerToAdd
//        .map(parishioner => ())
//        .filter(parishioner => group.names.length > 0);
//    }

//    return this.parishionerToAdd;
//  }

    onSubmit(){
      this.addParishioner()
    }

    addParishioner(){
      this.apiService.addParishioner(this.parishionerToAddForm.value).subscribe(
        (response) => {
          this.dialogRef.close(response)
        },
        (error) => {
          this.dialogRef.close(error)
        }
      )
    }

}
