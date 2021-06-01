import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../../apis/api.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router,
              private apiService: ApiService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onSubmit(): void{
    if (this.loginForm.valid){
      this.apiService.login(this.loginForm.value).subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token)
          if(response.role == "admin"){
            this.router.navigate(['/main/parishioner-list'])
          }else {
            this.router.navigate(['/select-scan'])
          }

        },
        error => {
          console.log(error)
          this.openSnackBar('Credenziali non corrette.', 'chiudi');
        }
      );
    }
}}
