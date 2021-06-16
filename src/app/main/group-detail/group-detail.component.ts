import { MatFabMenu } from '@angular-material-extensions/fab-menu';
import { SelectionModel } from '@angular/cdk/collections';
import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/apis/api.service';
import { AddParishionerToGroupComponent } from 'src/app/dialogs/add-parishioner-to-group/add-parishioner-to-group.component';
import { Parishioner } from 'src/app/models/parishioner';
import { ParishionerOfGroup } from 'src/app/models/parishioner-of-group';
import {ParishionersToGroup} from "../../models/parishioner-to-group";

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit, AfterViewInit {

  @Input() id !: number
  displayedColumns: string[] = ['name', 'surname', 'delete'];
  groupMembers !: ParishionerOfGroup[];
  notGroupMembers !: ParishionerOfGroup[];
  dataSource !: MatTableDataSource<ParishionerOfGroup>;
  selection = new SelectionModel<ParishionerOfGroup>(true, []);
  notAddable: boolean = true
  deleteRowCalled: boolean = false;

  fabButtonsRandom: MatFabMenu[] = [
    {
      id: 1,
      icon: 'person_add',
      tooltip: 'aggiungi un parrocchiano al gruppo',
      tooltipPosition: 'left',

    }
  ]

  displayedColumnsForNotMembers: string[] = ['nameNM', 'surnameNM', 'delete'];
  dataSourceForNotMembers !: MatTableDataSource<ParishionerOfGroup>;

  @ViewChild('paginator') paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService: ApiService,
              private dialog: MatDialog)
  {
    this.dataSource = new MatTableDataSource<ParishionerOfGroup>([]);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.notAddable = true;
      return;
    }

    this.selection.select(...this.dataSource.data);
    this.notAddable = false;
  }

  onSelect(){
    if(this.selection.selected.length > 0) {
      this.notAddable = false;
    }else{
      this.notAddable = true;
    }
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
    this.getGroupDetails(this.id);
  }

  onRowClick(row: Parishioner) {
    if(!this.deleteRowCalled){
      this.router.navigate(['/main/parishioner-detail', row.id]);
    }else{
      this.deleteRowCalled = false;
    }
  }

  deleteRow(row: any) {
    this.deleteRowCalled = true;
    console.log(row)
    this.apiService.removeParishionerFromGroup(row.id, this.id).subscribe(
      (response) => {
        console.log(response);
        this.getGroupDetails(this.id);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  private getGroupDetails(id: number) {
    this.apiService.getGroupMembers(id).subscribe(
      (response) => {
        console.log(response)
        this.dataSource.data = response
      },
      (error) => {
        console.log(error)
      }
    )
  }

  onSubmit() {
    
  }

  openDialog(event : any) {
    switch (event){
      case 1:
        const dialogRef = this.dialog.open(AddParishionerToGroupComponent, {
          data: {idGroup: this.id}
        });

        dialogRef.afterClosed().subscribe(result => {
          this.getGroupDetails(this.id)
        });
        break;
    
    }
  }

}
