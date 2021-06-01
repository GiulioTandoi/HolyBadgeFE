import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgxKjuaComponent} from "ngx-kjua/app/modules/ngx-kjua/ngx-kjua.component";

@Component({
  selector: 'app-qr-builder',
  templateUrl: './qr-builder.component.html',
  styleUrls: ['./qr-builder.component.css']
})
export class QrBuilderComponent implements OnInit {
  @Input() value !: number;
  @ViewChild('qrRenderer') qrRenderer !: NgxKjuaComponent;
  constructor() { }

  ngOnInit(): void {
  }
}
