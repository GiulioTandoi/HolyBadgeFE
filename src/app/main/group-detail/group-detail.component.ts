import { SelectionModel } from '@angular/cdk/collections';
import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { zip } from 'rxjs';
import { ApiService } from 'src/app/apis/api.service';
import { Parishioner } from 'src/app/models/parishioner';
import { ParishionerOfGroup } from 'src/app/models/parishioner-of-group';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit, AfterViewInit {

  @Input() id !: number
  displayedColumns: string[] = ['select', 'name', 'surname'];
  groupMembers !: ParishionerOfGroup[];
  notGroupMembers !: ParishionerOfGroup[];
  dataSource !: MatTableDataSource<ParishionerOfGroup>;
  selection = new SelectionModel<ParishionerOfGroup>(true, []);
  notAddable: boolean= true

  displayedColumnsForNotMembers: string[] = ['nameNM', 'surnameNM'];
  dataSourceForNotMembers !: MatTableDataSource<ParishionerOfGroup>;

  @ViewChild('paginator') paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  @ViewChild('paginatorForNotMembers') paginatorForNotMembers !: MatPaginator;
  @ViewChild(MatSort) sortForNotMembers !: MatSort;

  constructor(private route: ActivatedRoute,
              private apiService: ApiService)
  {
    this.dataSource = new MatTableDataSource<ParishionerOfGroup>([]);
    this.dataSourceForNotMembers = new MatTableDataSource<ParishionerOfGroup>([]);
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

  addParishionerToGroup(){
    let body ={
      ids:this.selection.selected.map(x=> x.id),
      groupId:this.id
    }
    console.log(body)
  }


  ngAfterViewInit() {
    this.dataSourceForNotMembers.paginator = this.paginatorForNotMembers;
    this.dataSourceForNotMembers.sort = this.sortForNotMembers;
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
        this.groupMembers=response.filter(x => !x.member)
        this.notGroupMembers=response.filter(x => x.member)
        this.dataSource.data = this.groupMembers
        this.dataSourceForNotMembers.data = this.notGroupMembers
      },
      (error) => {
        console.log(error)
      }
    )
  }

  onSubmit() {
    
  }

}
