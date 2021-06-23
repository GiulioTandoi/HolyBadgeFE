import { MatFabMenu } from '@angular-material-extensions/fab-menu';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/apis/api.service';
import { AddGroupToMeetingComponent } from 'src/app/dialogs/add-group-to-meeting/add-group-to-meeting.component';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ParishionerToMeetingComponent } from 'src/app/dialogs/parishioner-to-meeting/parishioner-to-meeting.component';
import { Meeting } from 'src/app/models/meeting';
import { Parishioner } from 'src/app/models/parishioner';
import { Partecipant } from 'src/app/models/partecipants';

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.css']
})
export class MeetingDetailComponent implements OnInit {

  fabButtonsRandom: MatFabMenu[] = [
    {
      id: 1,
      icon: 'person_add',
      tooltip: 'aggiungi un parrocchiano all\'incontro',
      tooltipPosition: 'left',

    },
    {
      id: 2,
      icon: 'group_work',
      tooltip: 'aggiungi un gruppo all\'incontro',
      tooltipPosition: 'left',

    }
  ];

  updateMeetingForm = new FormGroup({
    id: new FormControl(''),
    meetingName: new FormControl(''),
    location: new FormControl(''),
    date: new FormControl('')
  });

  @Input() id !: number
  displayedColumns: string[] = ['partecipation', 'name', 'surname', 'dataNascita' ,'memberships', 'delete'];
  meetingPartecipants !: Partecipant[];
  dataSource !: MatTableDataSource<Partecipant>;
  notAddable: boolean= true
  selection = new SelectionModel<Parishioner>(true, []);
  meetingData!: Meeting;
  deleteRowCalled: boolean = false;

  @ViewChild('paginator') paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService: ApiService,
              private dialog: MatDialog)
  {
    this.dataSource = new MatTableDataSource<Partecipant>([]);
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
    this.getMeetingDetails(this.id);
  }

  onRowClick(row : any) {
    console.log(row)
    if(!this.deleteRowCalled){
      this.router.navigate(['/main/parishioner-detail', row.partecipant.parishioner.id]);
    }else{
      this.deleteRowCalled = false;
    }
  }

  deleteRow(row: any) {
    this.deleteRowCalled = true;
    
    const dialogRef2 = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    dialogRef2.componentInstance.confirmMessage = "Sei sicuro di voler rimuovere questo parrocchiano dall'incontro?"

    dialogRef2.afterClosed().subscribe(result => {
      if(result) {
        this.apiService.removeParishionerFromMeeting(row.partecipant.parishioner.id, this.id).subscribe(
          (response) => {
            console.log(response);
            this.getMeetingDetails(this.id);
          },
          (error) => {
            console.log(error)
          }
        )    
      }
      
    });
  }

  private getMeetingDetails(id: number) {
    this.apiService.getMeetingPartecipants(id).subscribe(
      (response) => {
        console.log(response)
        this.meetingPartecipants = response
        this.meetingPartecipants.forEach(obj => {
          obj.memberships.forEach(childObj=> {
           childObj 
          });
        });
        this.dataSource.data = this.meetingPartecipants
        this.selection.clear()
      },
      (error) => {
        console.log(error)
      }
    )

    this.apiService.getMeetingDetails(id).subscribe(
      (response) => {
        console.log(response)
        this.meetingData = response;
        this.updateMeetingForm.controls.id.setValue(this.meetingData.id)
        this.updateMeetingForm.controls.meetingName.setValue(this.meetingData.meetingName)
        this.updateMeetingForm.controls.location.setValue(this.meetingData.location)
        this.updateMeetingForm.controls.date.setValue(this.meetingData.date)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  openDialog(event : any) {
    switch (event){
      case 1:
        const dialogRef = this.dialog.open(ParishionerToMeetingComponent, {
          data: {idMeeting: this.id}
        });

        dialogRef.afterClosed().subscribe(result => {
          this.getMeetingDetails(this.id)
        });
        break;
      case 2:
        const dialogRef2 = this.dialog.open(AddGroupToMeetingComponent, {
          data: {idMeeting: this.id}
        });

        dialogRef2.afterClosed().subscribe(result => {
          this.getMeetingDetails(this.id)
        });
        break;
      default:
        break;
    }

  }

  onSubmit() {
    this.apiService.modifyMeeting(this.updateMeetingForm.value).subscribe(
      response => {this.getMeetingDetails(this.id)},
      error => {console.error(error)}
    );
  }

}

