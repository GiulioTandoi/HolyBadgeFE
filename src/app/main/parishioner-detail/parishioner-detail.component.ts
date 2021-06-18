import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {Group} from "../../models/group";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ApiService} from "../../apis/api.service";
import {AdditionalInfo} from "../../models/additional-info";
import {Parishioner} from "../../models/parishioner";
import {FormControl, FormGroup} from "@angular/forms";
import {MatFabMenu} from "@angular-material-extensions/fab-menu";
import {MatDialog} from "@angular/material/dialog";
import {jsPDF} from 'jspdf';
import kjua  from 'kjua-svg';
import {Membership} from "../../models/membership";
import {MatOptionSelectionChange} from "@angular/material/core";
import {Meeting} from "../../models/meeting";
import { AddMeetingToParishionerComponent } from 'src/app/dialogs/add-meeting-to-parishioner/add-meeting-to-parishioner.component';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-parishioner-detail',
  templateUrl: './parishioner-detail.component.html',
  styleUrls: ['./parishioner-detail.component.css']
})
export class ParishionerDetailComponent implements OnInit, AfterViewInit {
  @Input() id !: number
  displayedColumns: string[] = ['meetingName', 'meetingDate', 'meetingLocation', 'partecipation', 'delete'];
  dataSource !: MatTableDataSource<Meeting>;
  parishionerData !: Parishioner;
  fabButtonsRandom: MatFabMenu[] = [
    {
      id: 1,
      icon: 'people',
      tooltip: 'associa incontri al parrocchiano',
      tooltipPosition: 'left',
    }
  ];
  columnsPerPage = 2;
  rowsPerPage = 4;
  pageWidth = 210;
  pageHeight = 297;
  // Avery 3490
  cellWidth = 50;
  cellHeight = 50;
  borderTopBottom = 0;
  borderLeftRight = 5;
  deleteRowCalled: boolean = false;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  updateParishionerForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    phoneNumber: new FormControl(''),
    note: new FormControl(''),
    secondPhone: new FormControl(''),
    dataNascita: new FormControl(''),
    allergiePatologie: new FormControl(''),
    tagliaMaglietta: new FormControl(''),
    memberships: new FormControl(),
    partecipations: new FormControl(),
  });

  memberships: Membership[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private apiService: ApiService,
              private dialog: MatDialog)
  {
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
    console.log(this.route.snapshot.paramMap.get('id'));
    this.id = +(this.route.snapshot.paramMap.get('id')!.toString())
    this.getParishionerDetails(this.id);
  }

  onRowClick(row: any) {
    if(!this.deleteRowCalled){
      this.router.navigate(['/main/meeting-detail', row.idMeeting]);
    }else{
      this.deleteRowCalled = false;
    }
  }

  deleteRow(row: any) {
    this.deleteRowCalled = true;
    console.log(row)
    this.apiService.removeParishionerFromMeeting(this.id, row.idMeeting).subscribe(
      (response) => {
        console.log(response);
        this.getParishionerDetails(this.id);
      },
      (error) => {
        console.log(error)
      }
    )
  }

  private getParishionerDetails(id: number) {
    this.apiService.getParishionerDetails(id).subscribe(
      (response) => {
        console.log(response)
        this.dataSource.data = response.partecipations;
        this.parishionerData = response.parishionerBaseInfo
        this.updateParishionerForm.controls.id.setValue(this.parishionerData.id)
        this.updateParishionerForm.controls.name.setValue(this.parishionerData.name)
        this.updateParishionerForm.controls.surname.setValue(this.parishionerData.surname)
        this.updateParishionerForm.controls.phoneNumber.setValue(this.parishionerData.phoneNumber)
        this.updateParishionerForm.controls.note.setValue(this.parishionerData.note)
        this.updateParishionerForm.controls.secondPhone.setValue(this.parishionerData.secondPhone)
        this.updateParishionerForm.controls.dataNascita.setValue(new Date(this.parishionerData.dataNascita).toISOString().substring(0,10))
        this.updateParishionerForm.controls.allergiePatologie.setValue(this.parishionerData.allergiePatologie)
        this.updateParishionerForm.controls.tagliaMaglietta.setValue(this.parishionerData.tagliaMaglietta)
        this.memberships = response.memberships;
        this.updateParishionerForm.controls.memberships.setValue(response.memberships.filter(x => x.membership))

      },
      (error) => {
        console.log(error)
      }
    )
  }

  onSubmit() {
    this.updateParishionerForm.controls.dataNascita.setValue(formatDate(this.updateParishionerForm.controls.dataNascita.value, 'yyyy-MM-dd', 'EN-en'));
    this.apiService.modifyParishioner(this.updateParishionerForm.value).subscribe(
      response => {this.getParishionerDetails(this.id)},
      error => {console.error(error)}
    );
  }

  openDialog(event : any) {
    switch (event){
      case 1:
        const dialogRef2 = this.dialog.open(AddMeetingToParishionerComponent, {data:{
          idParishioner: this.id
        }});

        dialogRef2.afterClosed().subscribe(result => {
          this.getParishionerDetails(this.id)
        });
        break;
      default:
        break;
    }

  }

  generatePDF(index = 0, document = new jsPDF(), colPos = 0, rowPos = 0) {
    document.setFontSize(12)


      const barcodeData = this.getBarcodeData(this.parishionerData.id.toString());

      const x = colPos * 106 + this.borderLeftRight;
      const y = this.borderTopBottom + rowPos * (this.cellHeight +18) + 10;
      document.addImage(barcodeData, "jpeg", x, y, this.cellWidth - 2, this.cellHeight - 2);
      document.text(`${this.parishionerData.name}`,x+ 54, y + 8, {maxWidth : 30});
      document.text(`${this.parishionerData.surname}`,x+ 54, y+18, {maxWidth : 30});

    document.save(`QR-Codes.pdf`);
  }

  getBarcodeData(text: string, size = 900) {
    return kjua({
      render: 'canvas',
      crisp: true,
      minVersion: 1,
      ecLevel: 'Q',
      size: size,
      ratio: undefined,
      fill: '#333',
      back: '#fff',
      text,
      rounded: 10,
      quiet: 2,
      mode: 'label',
      mSize: 5,
      mPosX: 50,
      mPosY: 100,
      label: text,
      fontname: 'sans-serif',
      fontcolor: '#3F51B5',
      image: undefined
    });
  }

  editRow(row: AdditionalInfo) {
    console.log()
  }

  onSelectionChangeGroups($event: MatOptionSelectionChange) {
    console.log($event)
    if($event.isUserInput){
    if(!$event.source.selected){
      //il controllo è true quindi chiamo l'api di eliminazione  dal gruppo
      //alla fine dell'api richiamo parishionerDetails
      console.log('elimino')
      this.apiService.removeParishionerFromGroup(this.id, $event.source.value.id).subscribe(
          (response) =>{
          },
          (error)=> {

          }
      );

    }else{
      //il controllo è false quindi chiamo l'api di aggiunta ad un gruppo
      //alla fine dell'api richiamo parishionerDetails
      let p  = {
        idParishioner: this.id,
        idGroup: $event.source.value.id
      }
      console.log(p)
      this.apiService.addParishionerToGroup(p).subscribe(
          (response) =>{

          },
          (error)=> {

          }
      );
      console.log('aggiungo')
    }
  }
  }
}










