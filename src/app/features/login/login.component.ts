import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLogging: boolean = false;
  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      phone: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    })
  }

  submitLogin() {
    this.isLogging = true;
    const { phone, password } = this.form.value;

    const endpoint = "https://cors-everywhere.herokuapp.com/http://abprojectsserver-env.eba-5pjjn569.us-east-1.elasticbeanstalk.com//login";

    this.http.post(endpoint, {
      phone,
      password
    })
    .subscribe((res: any): void => {
      this.isLogging = false;
      localStorage.setItem("abprojectsToken", res?.token || '')
      this.router.navigateByUrl("/dashboard");
    }, err => this.isLogging = false)
  }

}
