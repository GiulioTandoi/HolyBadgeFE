import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {Parishioner} from "../../models/parishioner";
import {ApiService} from "../../apis/api.service";
import {MatFabMenu} from "@angular-material-extensions/fab-menu";
import {MatDialog} from "@angular/material/dialog";
import {AddParishionerComponent} from "../../dialogs/add-parishioner/add-parishioner.component";
import {jsPDF} from "jspdf";
import kjua from "kjua-svg";

@Component({
  selector: 'app-parishioner-list',
  templateUrl: './parishioner-list.component.html',
  styleUrls: ['./parishioner-list.component.css']
})
export class ParishionerListComponent implements OnInit, AfterViewInit{
  columnsPerPage = 2;
  rowsPerPage = 4;
  pageWidth = 210;
  pageHeight = 297;
  // Avery 3490
  cellWidth = 50;
  cellHeight = 50;
  borderTopBottom = 0;
  borderLeftRight = 0;
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

  generatePDF(index = 0, document = new jsPDF(), colPos = 0, rowPos = 0) {
    let lenght = this.dataSource.data.length;
    document.setFontSize(12)
    for(let i: number = 0; i < lenght; i++) {

      let p : Parishioner = this.dataSource.data[i];
      const barcodeData = this.getBarcodeData(p.id.toString());
      console.log(p)
      const x = colPos * 106 + this.borderLeftRight;
      const y = this.borderTopBottom + rowPos * (this.cellHeight +18) + 10;
      document.addImage(barcodeData, "jpeg", x, y, this.cellWidth - 2, this.cellHeight - 2);
      document.text(`${p.name}`,x+ 54, y + 8, {maxWidth : 30});
      document.text(`${p.surname}`,x+ 54, y+18, {maxWidth : 30});

      colPos++;
      if (colPos >= this.columnsPerPage) {
        colPos = 0;
        rowPos++;
      }
      if (rowPos >= this.rowsPerPage && index < lenght - 1) {
        rowPos = 0;
        colPos = 0;
        document.addPage();
      }
    }
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
}


