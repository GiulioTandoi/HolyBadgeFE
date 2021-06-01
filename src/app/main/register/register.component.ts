import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/apis/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('admin')
  });

  constructor(private router: Router,
    private apiService: ApiService,
    private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void{
    if (this.registerForm.valid){
      console.log(this.registerForm.value);
      this.apiService.registerUser(this.registerForm.value).subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token)
          if(response.role == "admin"){
            this.router.navigate(['/login'])
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
  }
}
