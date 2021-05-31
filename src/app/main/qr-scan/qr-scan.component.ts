import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Result} from "@zxing/library";
import {ZXingScannerComponent} from "@zxing/ngx-scanner";
import {QrCodeStatus} from "../../utils/enums/qr-code-status";
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.component.html',
  styleUrls: ['./qr-scan.component.css']
})
export class QrScanComponent implements OnInit, AfterViewInit {
  status !: QrCodeStatus;

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
  constructor() {
  }

  ngAfterViewInit(){
    this.scanner.delayBetweenScanSuccess = 3000;
    this.scanner.timeBetweenScans = 3000;
  }
  ngOnInit(): void {
  this.status = QrCodeStatus.WAITING_FOR_QR
  }


  scanSuccessHandler($event: string) {
    this.status = QrCodeStatus.API_CALL_LOADING
      //if api call ok status = API_CALL_SUCCESS else status = API_CALL_FAIL
    setTimeout(()=>{
      this.status = QrCodeStatus.API_CALL_SUCCESS
    }, 200)
  }

  scanCompleteHandler($event: Result) {
    console.log("complete: " + $event)
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
}
