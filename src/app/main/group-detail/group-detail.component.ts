import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/apis/api.service';
import { Parishioner } from 'src/app/models/parishioner';
import { ParishionerOfGroup } from 'src/app/models/parishioner-of-group';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  @Input() id !: number
  displayedColumns: string[] = ['select', 'name', 'surname'];
  dataSource !: MatTableDataSource<ParishionerOfGroup>;
  selection = new SelectionModel<ParishionerOfGroup>(true, []);

  displayedColumnsForNotMembers: string[] = ['name', 'surname'];
  dataSourceForNotMembers !: MatTableDataSource<ParishionerOfGroup>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  @ViewChild(MatPaginator) paginatorForNotMembers !: MatPaginator;
  @ViewChild(MatSort) sortForNotMembers !: MatSort;

  constructor(private route: ActivatedRoute,
              private apiService: ApiService)
  {
    this.dataSource = new MatTableDataSource<ParishionerOfGroup>();
    this.dataSourceForNotMembers = new MatTableDataSource<ParishionerOfGroup>();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: ParishionerOfGroup): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSourceForNotMembers.paginator = this.paginatorForNotMembers;
    this.dataSourceForNotMembers.sort = this.sortForNotMembers;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  applyFilterForNotMembers(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceForNotMembers.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceForNotMembers.paginator) {
      this.dataSourceForNotMembers.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.id = +(this.route.snapshot.paramMap.get('id')!.toString())
    this.getGroupDetails(this.id);
  }

  onRowClick(row: Parishioner) {

  }


  private getGroupDetails(id: number) {
    this.apiService.getGroupMembers(id).subscribe(
      (response) => {
        console.log(response)
        this.dataSource.data = response;
        
      },
      (error) => {
        console.log(error)
      }
    )
  }

  onSubmit() {
    
  }

}
