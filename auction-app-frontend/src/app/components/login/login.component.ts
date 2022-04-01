import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Apollo} from "apollo-angular";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {SpinnerService} from "../../services/spinner.service";
import {filter, pipe, tap} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage = '';
  loginForm!: FormGroup;

  constructor(
    private apollo: Apollo,
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

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.spinnerService.loadingOn();

    const {username, password} = this.loginForm.value;

    this.authService.onLogin({
      username,
      password
    })
      .subscribe((result) => {
      if (result) {
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Hata mesajı';
      }
      this.spinnerService.loadingOff();
    });
  }
}
