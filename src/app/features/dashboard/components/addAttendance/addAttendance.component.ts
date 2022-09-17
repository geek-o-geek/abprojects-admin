import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-add-attendance",
  templateUrl: "./addAttendance.component.html",
  styleUrls: ["./addAttendance.component.scss"],
})
export class AddAttendanceComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  workers: any = [];
  constructor(private http: HttpClient, 
    private fb: FormBuilder,
    private router: Router) {
      const endpoint =
      `${environment.baseUrl}/master/get?type=all`;
      const headers = {
        headers: new HttpHeaders({
          "Content-type": "application/json",
          Authorization: localStorage.getItem("abprojectsToken") || "",
        }),
      };

      this.http.get(endpoint, headers)
      .pipe(take(1))
      .subscribe((res: any): void => {
        this.workers = res.data?.worker;
      });
    }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    // const fileLocation: string = req['files']?.length? req['files'][0].originalname: ''; 
    this.form = this.fb.group({
      startLocation: ["", Validators.compose([Validators.required])],
      workHours: ["", Validators.compose([Validators.required])],
      startTime: ["", Validators.compose([Validators.required])],
      endTime: ["", Validators.compose([Validators.required])],
      title: ["", Validators.compose([Validators.required])],
      attendanceDate: ["", Validators.compose([Validators.required])],
      allDay: ["", Validators.compose([Validators.required])],
      workerId: ["", Validators.compose([Validators.required])],
      comment: ["", Validators.compose([Validators.required])],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  submitForm() {
    this.submitted = true;
    console.log(this.form.value)
    if (this.form.invalid) {
      return;
    }

    const formValues: any = this.form.value;

    const payload = {
      startLocation: formValues.startLocation,
      workHours: formValues.workHours,
      startTime: formValues.startTime,
      endTime: formValues.endTime,
      title: formValues.title,
      allDay: formValues.allDay,
      attendanceDate: formValues.attendanceDate,
      userId: 1,
      workerId: formValues.workerId,
      comment: formValues.comment
    };

    const endpoint =
    `${environment.baseUrl}/attendance`;
    const headers = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        Authorization: localStorage.getItem("abprojectsToken") || "",
      }),
    };

    this.http.post(endpoint, payload, headers)
    .pipe(take(1))
    .subscribe(
      (res: any): void => {
        this.submitted = false;
        this.form.reset();
        alert("Attendance added successfully");
      },
      (err) => {
        this.submitted = false;
        alert("Some error while adding");
      }
    );
  }

  thisFileUpload() {
    document.getElementById("file")?.click();
  }

  goto(route: string = "") {
    this.router.navigateByUrl(route);
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }
}
