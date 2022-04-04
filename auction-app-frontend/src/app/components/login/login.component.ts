import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {SpinnerService} from "../../services/spinner.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage = '';
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  };

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.spinnerService.loadingOn();

    const {username, password} = this.loginForm.value;

    this.authService.login({
      username,
      password
    }).subscribe((result) => {
      if (result) {
        this.router.navigate(['/']);
      }
    }, (error) => {
      this.errorMessage = error;
      this.spinnerService.loadingOff();
    }, () => {
      this.spinnerService.loadingOff();
    });
  }
}
