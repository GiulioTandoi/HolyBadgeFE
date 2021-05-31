import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxKjuaComponent} from "ngx-kjua/app/modules/ngx-kjua/ngx-kjua.component";

@Component({
  selector: 'app-qr-builder',
  templateUrl: './qr-builder.component.html',
  styleUrls: ['./qr-builder.component.css']
})
export class QrBuilderComponent implements OnInit {
  value : string = '';
  @ViewChild('qrRenderer') qrRenderer !: NgxKjuaComponent;
  constructor() { }

  ngOnInit(): void {
  }



  onEnter(value: string) {
    this.value = value;
    this.qrRenderer.text = this.value ;
    this.qrRenderer.renderCode();
  }
}
