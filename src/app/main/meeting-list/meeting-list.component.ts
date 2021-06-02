import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {ApiService} from "../../apis/api.service";
import {Meeting} from "../../models/meeting";
import { AddMeetingComponent } from 'src/app/dialogs/add-meeting/add-meeting.component';
import { MatDialog } from '@angular/material/dialog';
import { MatFabMenu } from '@angular-material-extensions/fab-menu';

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
              private apiService: ApiService,
              private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Meeting>();
  }

  fabButtonsRandom: MatFabMenu[] = [
    {
      id: 1,
      icon: 'people',
      tooltip: 'crea incontro',
      tooltipPosition: 'left',
    }
  ];

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

  openDialog(event : any) {
    switch (event){
      case 1:
        const dialogRef = this.dialog.open(AddMeetingComponent);

        dialogRef.afterClosed().subscribe(result => {
          this.getMeetings()
        });
        break;
      default:
        break;
    }

  }

}
