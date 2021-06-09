import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Result} from "@zxing/library";
import {ZXingScannerComponent} from "@zxing/ngx-scanner";
import {QrCodeStatus} from "../../utils/enums/qr-code-status";
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";
import {ApiService} from "../../apis/api.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.component.html',
  styleUrls: ['./qr-scan.component.css']
})
export class QrScanComponent implements OnInit, AfterViewInit {
  status !: QrCodeStatus;
  title !: string;
  isEntrance !: boolean
  optionsQr: AnimationOptions = {
    path: '/assets/qr-scan.json',
  };
  optionsSuccess: AnimationOptions = {
    path: '/assets/correct.json',
  };
  optionsFailure: AnimationOptions = {
    path: '/assets/failure.json',
  };

  @ViewChild('scanner', { static: false }) scanner !: ZXingScannerComponent ;
  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngAfterViewInit(){
    this.scanner.delayBetweenScanSuccess = 4000;
    this.scanner.timeBetweenScans = 4000;
  }
  ngOnInit(): void {
    this.isEntrance = +(this.route.snapshot.paramMap.get('e')!.toString()) == 1 ? true : false
    this.title = this.isEntrance ? "entrata" : "uscita"
    this.status = QrCodeStatus.WAITING_FOR_QR
  }


  scanSuccessHandler($event: string) {
    console.log($event)
    this.status = QrCodeStatus.API_CALL_LOADING
    if(this.isEntrance){
     this.apiService.registerEntrance(+$event).subscribe(
         (response) => {
           this.status = QrCodeStatus.API_CALL_SUCCESS
         },
         (error) => {
           
           this.status = QrCodeStatus.API_CALL_FAILED
         }
     )}else{
      this.apiService.registerExit(+$event).subscribe(
          (response) => {
            this.openSnackBar(response, 'chiudi')
            this.status = QrCodeStatus.API_CALL_SUCCESS
          },
          (error) => {
          
            this.openSnackBar(error.error, 'chiudi')
            this.status = QrCodeStatus.API_CALL_FAILED
          }
      )
    }

  }

  scanFailureHandler($event: any) {
    this.status = QrCodeStatus.WAITING_FOR_QR
  }

  scanErrorHandler($event: Error) {
    console.log($event)
    this.status = QrCodeStatus.WAITING_FOR_QR
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
