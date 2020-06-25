import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginFormI();
    // get return url from route parameters or default to '/'
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
    if (this.loginForm.invalid) {

    }
    this.loading = false;
  }
}
