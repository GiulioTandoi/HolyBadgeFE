import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ParishionerAccess} from "../../models/parishioner-access";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {ApiService} from "../../apis/api.service";
import {Group} from "../../models/group";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['id', 'name'];
  dataSource !: MatTableDataSource<Group>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator : MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort : MatSort;

  constructor(private router: Router,
              private apiService: ApiService) {
    this.dataSource = new MatTableDataSource<Group>();
  }

  ngAfterViewInit() :void{
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
    this.getGroups()
  }

  onRowClick(row: Group) {

  }

  private getGroups() {
    this.apiService.getGroups().subscribe(
      (response) => {
        console.log(response)
        this.dataSource.data = response;
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
