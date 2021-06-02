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
import {AddAdditionalInfoComponent} from "../../dialogs/add-additional-info/add-additional-info.component";
import {MatDialog} from "@angular/material/dialog";
import {jsPDF} from 'jspdf';
import kjua  from 'kjua-svg';

@Component({
  selector: 'app-parishioner-detail',
  templateUrl: './parishioner-detail.component.html',
  styleUrls: ['./parishioner-detail.component.css']
})
export class ParishionerDetailComponent implements OnInit, AfterViewInit {
  @Input() id !: number
  displayedColumns: string[] = ['infoName', 'infoValue'];
  dataSource !: MatTableDataSource<AdditionalInfo>;
  parishionerData !: Parishioner;
  fabButtonsRandom: MatFabMenu[] = [
    {
      id: 1,
      icon: 'playlist_add',
      tooltip: 'aggiungi informazioni del parrocchiano',
      tooltipPosition: 'left',

    }
  ];
  columnsPerPage = 3;
  rowsPerPage = 8;
  pageWidth = 210;
  pageHeight = 297;
  // Avery 3490
  cellWidth = 36;
  cellHeight = 36;
  borderTopBottom = ((this.pageHeight - (this.rowsPerPage * this.cellHeight)) / 2);

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  updateParishionerForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    phoneNumber: new FormControl(''),
    note: new FormControl('')
  });

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private dialog: MatDialog)
  {
    this.dataSource = new MatTableDataSource<AdditionalInfo>();
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

  onRowClick(row: Group) {

  }


  private getParishionerDetails(id: number) {
    this.apiService.getParishionerDetails(id).subscribe(
      (response) => {
        console.log(response)
        this.dataSource.data = response.additionalInfos;
        this.parishionerData = response.parishionerBaseInfo
        this.updateParishionerForm.controls.id.setValue(this.parishionerData.id)
        this.updateParishionerForm.controls.name.setValue(this.parishionerData.name)
        this.updateParishionerForm.controls.surname.setValue(this.parishionerData.surname)
        this.updateParishionerForm.controls.phoneNumber.setValue(this.parishionerData.phoneNumber)
        this.updateParishionerForm.controls.note.setValue(this.parishionerData.note)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  onSubmit() {
    this.apiService.modifyParishioner(this.updateParishionerForm.value).subscribe(
      response => {this.getParishionerDetails(this.id)},
      error => {console.error(error)}
    );
  }

  openDialog(event : any) {
    switch (event){
      case 1:
        const dialogRef = this.dialog.open(AddAdditionalInfoComponent, {data:{
            idParishioner: this.id
          }});

        dialogRef.afterClosed().subscribe(result => {
          this.getParishionerDetails(this.id)
        });
        break;
      default:
        break;
    }

  }

  generatePDF(document = new jsPDF(), rowPos = 0, colPos= 0) {

    const barcodeData = this.getBarcodeData(this.id.toString());


    const x = ((this.pageWidth / this.columnsPerPage) / 2) - (this.cellWidth / 2) + (colPos * (this.pageWidth / this.columnsPerPage));
    const y = this.borderTopBottom + (rowPos * this.cellHeight) + 1;
    document.addImage(barcodeData, "jpeg", x, y, this.cellWidth - 2, this.cellHeight - 2);
    document.save(`${this.parishionerData.name}_${this.parishionerData.surname}.pdf`);

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
}










