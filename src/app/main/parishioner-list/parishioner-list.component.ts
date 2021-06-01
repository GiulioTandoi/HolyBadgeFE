import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute, Router} from "@angular/router";
import {Parishioner} from "../../models/parishioner";
import {ApiService} from "../../apis/api.service";
import {ParishionerAccess} from "../../models/parishioner-access";
import {MatFabMenu} from "@angular-material-extensions/fab-menu";
import {MatDialog} from "@angular/material/dialog";
import {AddParishionerComponent} from "../../dialogs/add-parishioner/add-parishioner.component";

@Component({
  selector: 'app-parishioner-list',
  templateUrl: './parishioner-list.component.html',
  styleUrls: ['./parishioner-list.component.css']
})
export class ParishionerListComponent implements OnInit, AfterViewInit{
  fabButtonsRandom: MatFabMenu[] = [
    {
      id: 1,
      icon: 'person_add',
      tooltip: 'aggiungi parrocchiano',
      tooltipPosition: 'left',

    }
  ];
  displayedColumns: string[] = ['name', 'surname', 'phoneNumber', 'note'];
  dataSource !: MatTableDataSource<Parishioner>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private router: Router,
              private apiService: ApiService,
              private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Parishioner>();
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
    this.getParishioner()
  }

  onRowClick(row : Parishioner) {
    console.log(row)
    this.router.navigate(['/main/parishioner-detail', row.id]);
  }

  private getParishioner(){
    this.apiService.getParishioners().subscribe(
      (response) => {
        console.log(response);
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
        const dialogRef = this.dialog.open(AddParishionerComponent);

        dialogRef.afterClosed().subscribe(result => {
          this.getParishioner()
        });
        break;
      default:
        break;
    }

  }
}


