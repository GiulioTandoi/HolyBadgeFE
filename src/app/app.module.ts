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
import {MatPseudoCheckboxModule, MatRippleModule} from "@angular/material/core";
import { AddMeetingComponent } from './dialogs/add-meeting/add-meeting.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AddGroupComponent } from './dialogs/add-group/add-group.component';
import { GroupDetailComponent } from './main/group-detail/group-detail.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from "@angular/material/icon";
import { MatNativeDateModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ParishionerToMeetingComponent } from './dialogs/parishioner-to-meeting/parishioner-to-meeting.component';
import { MeetingDetailComponent } from './main/meeting-detail/meeting-detail.component';
import { AddGroupToMeetingComponent } from './dialogs/add-group-to-meeting/add-group-to-meeting.component';
import {MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";
import { AddMeetingToParishionerComponent } from './dialogs/add-meeting-to-parishioner/add-meeting-to-parishioner.component';
import { AddParishionerToGroupComponent } from './dialogs/add-parishioner-to-group/add-parishioner-to-group.component';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';


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
      { path: 'register', component: RegisterComponent },
      { path: 'group-detail/:id', component: GroupDetailComponent },
      { path: 'meeting-detail/:id', component: MeetingDetailComponent }
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
    AddMeetingComponent,
    AddGroupComponent,
    GroupDetailComponent,
    ParishionerToMeetingComponent,
    AddGroupToMeetingComponent,
    MeetingDetailComponent,
    AddMeetingToParishionerComponent,
    AddParishionerToGroupComponent,
    ConfirmationDialogComponent
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
        MatDatepickerModule,
        MatCheckboxModule,
        MatIconModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatTooltipModule
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
    AddMeetingComponent,
    AddGroupComponent,
    ParishionerToMeetingComponent,
    AddGroupToMeetingComponent,
    AddMeetingToParishionerComponent,
    AddParishionerToGroupComponent,
    ConfirmationDialogComponent
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
