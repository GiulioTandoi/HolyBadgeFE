import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {ParishionerAccess} from "../../models/parishioner-access";
import {ApiService} from "../../apis/api.service";

@Component({
  selector: 'app-access-list',
  templateUrl: './access-list.component.html',
  styleUrls: ['./access-list.component.css']
})
export class AccessListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'surname', 'entranceDate', 'exitDate'];
  dataSource !: MatTableDataSource<ParishionerAccess>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private router: Router,
              private apiService: ApiService) {
    this.dataSource = new MatTableDataSource<ParishionerAccess>();
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
    this.getAccess()
  }

  onRowClick(row : ParishionerAccess) {
    this.router.navigate(['/main/parishioner-detail', row.idParishioner]);
  }

  private getAccess(){
    this.apiService.getAccess().subscribe(
      (response: ParishionerAccess[]) => {
        console.log(response)
        this.dataSource = new MatTableDataSource(response);
      },
      (error)=>{
        console.log(error)
      }
    )
  }

}
