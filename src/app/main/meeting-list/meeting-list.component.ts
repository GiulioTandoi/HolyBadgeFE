import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {ApiService} from "../../apis/api.service";
import {Meeting} from "../../models/meeting";

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['meetingName', 'location', 'date'];
  dataSource !: MatTableDataSource<Meeting>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private router: Router,
              private apiService: ApiService) {
    this.dataSource = new MatTableDataSource<Meeting>();
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
    this.getMeetings()
  }

  onRowClick(row: Meeting) {

  }

  private getMeetings() {
    this.apiService.getMeetings().subscribe(
      (response: Meeting[]) => {
        console.log(response)
        this.dataSource.data = response;

      },
      (error) => {
        console.log(error)
      }
    )
  }
}
