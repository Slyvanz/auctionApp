import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {SpinnerService} from "../../services/spinner.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMessage = '';
  registerForm!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rePassword: ['', Validators.required],
    }, {
      validators: (formGroup: AbstractControl): ValidationErrors | null => {
        const { password, rePassword } = formGroup.value;
        return password === rePassword ? null : { passwordMismatch: true }
      }
    });
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    this.spinnerService.loadingOn();

    const {username, password} = this.registerForm.value;

    this.authService.register({
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
