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
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['name', 'delete'];
  dataSource !: MatTableDataSource<Group>;
  deleteRowCalled: boolean = false;

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
    console.log(row)
    if(!this.deleteRowCalled){
      this.router.navigate(['/main/group-detail', row.id]);
    }else{
      this.deleteRowCalled = false;
    }
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

  deleteRow(row: Group) {
    this.deleteRowCalled = true;

    const dialogRef2 = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    dialogRef2.componentInstance.confirmMessage = "Sei sicuro di voler eliminare questo Gruppo?"

    dialogRef2.afterClosed().subscribe(result => {
      if(result) {
        this.apiService.deleteGroup(row.id).subscribe(
          (response) => {
            console.log(response);
            this.getGroups();
          },
          (error) => {
            console.log(error)
          }
        )
      }
      
    });
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
