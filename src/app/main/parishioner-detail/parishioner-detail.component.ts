import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {Group} from "../../models/group";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ApiService} from "../../apis/api.service";
import {AdditionalInfo} from "../../models/additional-info";
import {Parishioner} from "../../models/parishioner";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-parishioner-detail',
  templateUrl: './parishioner-detail.component.html',
  styleUrls: ['./parishioner-detail.component.css']
})
export class ParishionerDetailComponent implements OnInit {
  @Input() id !: number
  displayedColumns: string[] = ['infoName', 'infoValue'];
  dataSource !: MatTableDataSource<AdditionalInfo>;
  parishionerData !: Parishioner;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  updateParishionerForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    phoneNumber: new FormControl(''),
    note: new FormControl('')
  });

  constructor(private route: ActivatedRoute,
              private apiService: ApiService)
  {
    this.dataSource = new MatTableDataSource<AdditionalInfo>();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.id = +(this.route.snapshot.paramMap.get('id')!.toString())
    this.getParishionerDetails(this.id);
  }

  onRowClick(row: Group) {

  }


  private getParishionerDetails(id: number) {
    this.apiService.getParishionerDetails(id).subscribe(
      (response) => {
        console.log(response)
        this.dataSource = new MatTableDataSource(response.additionalInfos);
        this.parishionerData = response.parishionerBaseInfo
        this.updateParishionerForm.controls.id.setValue(this.parishionerData.id)
        this.updateParishionerForm.controls.name.setValue(this.parishionerData.name)
        this.updateParishionerForm.controls.surname.setValue(this.parishionerData.surname)
        this.updateParishionerForm.controls.phoneNumber.setValue(this.parishionerData.phoneNumber)
        this.updateParishionerForm.controls.note.setValue(this.parishionerData.note)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  onSubmit() {

  }
}










