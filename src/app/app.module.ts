import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import { QrScanComponent } from './main/qr-scan/qr-scan.component';
import {RouterModule, Routes} from "@angular/router";
import { MainComponent } from './main/main.component';
import {NgxKjuaModule} from "ngx-kjua";
import { QrBuilderComponent } from './main/qr-builder/qr-builder.component';
import { LoginComponent } from './main/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './main/register/register.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";
import {FlexLayoutModule} from "@angular/flex-layout";
import player from 'lottie-web';
import {LottieModule} from "ngx-lottie";
import { ParishionerListComponent } from './main/parishioner-list/parishioner-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { ParishionerDetailComponent } from './main/parishioner-detail/parishioner-detail.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {UserGuard} from "./guards/user.guard";
import {AdminGuard} from "./guards/admin.guard";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {ApiService} from "./apis/api.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientModule} from "@angular/common/http";
import { AccessListComponent } from './main/access-list/access-list.component';
import { GroupListComponent } from './main/group-list/group-list.component';
import { MeetingListComponent } from './main/meeting-list/meeting-list.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatFabMenuModule} from "@angular-material-extensions/fab-menu";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import { AddParishionerComponent } from './dialogs/add-parishioner/add-parishioner.component';
import { AddAdditionalInfoComponent } from './dialogs/add-additional-info/add-additional-info.component';
import { SelectScanComponent } from './main/select-scan/select-scan.component';
import {MatRippleModule} from "@angular/material/core";
import { AddMeetingComponent } from './dialogs/add-meeting/add-meeting.component';
import {MatDatepickerModule} from '@angular/material/datepicker';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}

const appRoutes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'select-scan', component: SelectScanComponent},
  { path: 'scan/:e', component: QrScanComponent },
  { path: 'create-qr', component: QrBuilderComponent},
  { path: 'main' ,component: MainComponent, children:[
      { path: 'parishioner-list', component: ParishionerListComponent },
      { path: 'parishioner-detail/:id', component: ParishionerDetailComponent },
      { path: 'meeting-list', component: MeetingListComponent },
      { path: 'group-list', component: GroupListComponent },
      { path: 'access-list', component: AccessListComponent },
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    QrScanComponent,
    MainComponent,
    QrBuilderComponent,
    LoginComponent,
    RegisterComponent,
    ParishionerListComponent,
    ParishionerDetailComponent,
    AccessListComponent,
    GroupListComponent,
    MeetingListComponent,
    AddParishionerComponent,
    AddAdditionalInfoComponent,
    SelectScanComponent,
    AddMeetingComponent
  ],
  imports: [
    BrowserModule,
    ZXingScannerModule,
    NgxKjuaModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    FlexLayoutModule,
    MatTableModule,
    LottieModule.forRoot({player: playerFactory}),
    MatPaginatorModule,
    MatToolbarModule,
    MatSnackBarModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatFabMenuModule,
    MatDialogModule,
    MatRippleModule,
    MatDatepickerModule
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    JwtHelperService,
    AdminGuard,
    UserGuard,
    ApiService
  ],
  entryComponents: [
    AddParishionerComponent,
    AddMeetingComponent
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
