import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ParishionerAccess} from "../../models/parishioner-access";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {ApiService} from "../../apis/api.service";
import {Group} from "../../models/group";
import { AddGroupComponent } from 'src/app/dialogs/add-group/add-group.component';
import { MatFabMenu } from '@angular-material-extensions/fab-menu';
import { MatDialog } from '@angular/material/dialog';

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
              private apiService: ApiService,
              private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Group>();
  }

  fabButtonsRandom: MatFabMenu[] = [
    {
      id: 1,
      icon: 'group_work',
      tooltip: 'crea gruppo',
      tooltipPosition: 'left',
    }
  ];

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
    this.router.navigate(['/main/group-detail', row.id]);
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


  openDialog(event : any) {
    switch (event){
      case 1:
        const dialogRef = this.dialog.open(AddGroupComponent);

        dialogRef.afterClosed().subscribe(result => {
          this.getGroups()
        });
        break;
      default:
        break;
    }

  }

}
