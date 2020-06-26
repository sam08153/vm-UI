import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../app/services';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.userValue) {
      this.router.navigate(['/welcome']);
    }
  }

  ngOnInit(): void {
    this.loginFormI();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  loginFormI() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.pattern(EMAIL_REGEX),Validators.required]],
      password: ['',[Validators.required,
              Validators.minLength(5)]
            ],
    });
  }

  onSubmit() {
    this.submitted = true;
    const val =this.loginForm.value
    const email = val.email
    const password = val.password
    this.loading = true;
    if (this.loginForm.valid) {
      this.authenticationService.login(email, password)
      .pipe(first())
      .subscribe(
          data => {
              this.router.navigate(["/welcome"]);
          },
          error => {
              this.error = error;
              this.loading = false;
          });
    }
    this.loading = false;
  }
}
