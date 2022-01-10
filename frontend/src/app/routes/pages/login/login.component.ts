import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';
  disableSubmitBtn = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

  }

  ngOnInit(): void {

    this.initForm();

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  /**
   * On submit form
   */
  onSubmit() {

    this.submitted = true;
    this.disableSubmitBtn = true;
    this.error = '';

    // Stop here if form is invalid
    if (this.form.invalid) {
      this.disableSubmitBtn = false;
      return;
    }

    // Try to login if form is valid
    this.login();
  }

  login() {
    this.authenticationService.login(this.form.value.email, this.form.value.password)
      .subscribe(
        (data: any) => {
          this.disableSubmitBtn = false;
          this.router.navigate([this.returnUrl]);
        },
        (httpError: any) => {

          if(httpError.status == 401){
            this.error = 'wrong email or password.';
          }

          this.disableSubmitBtn = false;
        });
  }

}
