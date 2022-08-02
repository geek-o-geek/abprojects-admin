import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-manage-supervisor",
  templateUrl: "./manageSupervisor.component.html",
  styleUrls: ["./manageSupervisor.component.scss"],
})
export class ManageSupervisorComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  wards: any[] = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    const endpoint =
      "https://cors-everywhere.herokuapp.com/http://abprojectsserver-env.eba-5pjjn569.us-east-1.elasticbeanstalk.com/get/wards";
    const headers = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        Authorization: localStorage.getItem("abprojectsToken") || "",
      }),
    };

    this.http.get(endpoint, headers).subscribe((res: any) => {
      this.wards = res?.data || [];
    });
  }

  createForm() {
    this.form = this.fb.group({
      member_no: ["", Validators.compose([Validators.required])],
      surname: ["", Validators.compose([Validators.required])],
      first_name: ["", Validators.compose([Validators.required])],
      initials: ["", Validators.compose([Validators.required])],
      area: ["", Validators.compose([Validators.required])],
      phone_no: ["", Validators.compose([Validators.required])],
      safety_boots: [""],
      education: [""],
      dependants: ["", Validators.compose([Validators.required])],
      overseer_verified: [false],
      date_verified: [null, Validators.compose([Validators.required])],
      bank_name: [""],
      account_no: [""],
      branch_code: [""],
      branch_name: [""],
      password: [this.autoPassword, Validators.compose([Validators.required])],
      wardId: [""],
      wardFilter: [""],
    });
  }

  get autoPassword() {
    var digits = "0123456789";
    let password = "";
    for (let i = 0; i < 4; i++) {
      password += digits[Math.floor(Math.random() * 10)];
    }
    return password;
  }

  submitForm() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const formValues: any = this.form.value;

    const payload = {
      mobile: formValues.phone_no,
      password: formValues.password,
      username: formValues.first_name,
      wardId: formValues.wardId,
    };

    const endpoint =
      "https://cors-everywhere.herokuapp.com/http://abprojectsserver-env.eba-5pjjn569.us-east-1.elasticbeanstalk.com/add/supervisor";
    const headers = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        Authorization: localStorage.getItem("abprojectsToken") || "",
      }),
    };

    this.http.post(endpoint, payload, headers).subscribe(
      (res: any): void => {
        this.submitted = false;
        this.form.reset();
        this.form.get("password")?.setValue(this.autoPassword);
        alert("Supervisor added successfully");
      },
      (err) => {
        this.submitted = false;
        alert("Some error while adding");
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  goto(route: string = "", item: any = {}) {
    this.router.navigateByUrl(route, { state: item });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }
}
