import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-scan',
  templateUrl: './select-scan.component.html',
  styleUrls: ['./select-scan.component.css']
})
export class SelectScanComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openScanner($event : number){
    this.router.navigate(['scan', $event]);
  }

}
