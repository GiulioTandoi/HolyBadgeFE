import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from 'src/app/apis/api.service';
import { ParishionerOfGroup } from 'src/app/models/parishioner-of-group';

@Component({
  selector: 'app-add-parishioner-to-group',
  templateUrl: './add-parishioner-to-group.component.html',
  styleUrls: ['./add-parishioner-to-group.component.css']
})
export class AddParishionerToGroupComponent implements OnInit {

  membersForm= new FormGroup({
    memberControl: new FormControl('')
  }) 
  
  
  notMembers !: ParishionerOfGroup[];
  filteredParishioners!: Observable<ParishionerOfGroup[]>;
  idParishionerSelected!: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private apiService : ApiService,
              public dialogRef: MatDialogRef<ParishionerOfGroup>) {}

  ngOnInit() {
    this.getAllNotMembers(this.data.idGroup);
    console.log("NON MEMBRI "+ this.notMembers);
  }
  
  private _filter(name: string): ParishionerOfGroup[] {
    const filterValue = name.toLowerCase();

    return this.notMembers.filter(notMembers => notMembers.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onSubmit(){
    this.addParishionerToGroup(this.idParishionerSelected)
  }

  addParishionerToGroup(idParishioner: number){
    console.log("CONTENUTO DEL FORM " + this.membersForm.controls.memberControl.value);
    let idGroup: number = Number(this.data.idGroup);

    this.apiService.addParishionerToGroup({idParishioner, idGroup}).subscribe(
      (response) => {
        this.dialogRef.close(response)
      },
      (error) => {
        this.dialogRef.close(error)
      }
    )
  }

  writeResult(member: ParishionerOfGroup){
    return member.name + " " + member.surname + ", " + formatDate(member.dataNascita, 'dd-MM-yyyy', "EN-en")
  }

  getAllNotMembers(idGroup: number){
    this.apiService.getGroupNotMembers(idGroup).subscribe(
      (response) => {
        console.log(response);
        this.notMembers = response;
        this.filteredParishioners = this.membersForm.controls.memberControl.valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.notMembers.slice())
          );
      },
      (error) => {
        this.dialogRef.close(error);
      }
    )
  }

  setSelectedParishioner(member: ParishionerOfGroup) {
    this.idParishionerSelected = member.id;
  }
}
