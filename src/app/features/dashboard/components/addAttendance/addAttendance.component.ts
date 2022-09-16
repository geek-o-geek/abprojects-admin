import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { take } from "rxjs/operators";

@Component({
  selector: "app-add-attendance",
  templateUrl: "./addAttendance.component.html",
  styleUrls: ["./addAttendance.component.scss"],
})
export class AddAttendanceComponent implements OnInit {
  form!: FormGroup;
  uploadedFiles: any;
  profiledata: any = {};
  profileImage: string = "";
  idCard: string = "";
  contract: string = "";
  submitted: boolean = false;
  constructor(private http: HttpClient, 
    private fb: FormBuilder,
    private router: Router) {}

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
      // allDay: ["", Validators.compose([Validators.required])],
      attendanceDate: ["", Validators.compose([Validators.required])],
      userId: ["", Validators.compose([Validators.required])],
      workerId: ["", Validators.compose([Validators.required])],
      comment: ["", Validators.compose([Validators.required])],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  thisFileUploadchange(element: any) {
    this.uploadedFiles = element.target.files[0];
    this.upload();
  }

  upload() {
    if (!this.uploadedFiles) {
      alert("file is mandatory");
      return;
    }
    const filename = this.uploadedFiles.name;

    const endpoint = `https://cors-everywhere.herokuapp.com/http://abprojectsservernew-env.eba-pgmbgh3j.us-east-1.elasticbeanstalk.com/presignedURL?fileName=${filename}&folderName=mastersheets&bucketName=abprojects-bucket1`;
    const headers = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        Authorization: localStorage.getItem("abprojectsToken") || "",
      }),
    };

    this.http.get(endpoint, headers).subscribe((response) => {
      this.uploadS3(response);
    });
  }

  uploadS3(data: any) {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
      }
    });

    xhr.open("PUT", data?.uploadUrl);
    xhr.setRequestHeader("content-type", "image/jpeg");
    xhr.setRequestHeader("key", data?.filePath);
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.onload = () => {
      if (xhr.status === 200) {
        this.uploadMasterApi(data?.filePath);
      }
    };
    xhr.onerror = () => {
      alert("some error while uploading");
    };
    xhr.send(this.uploadedFiles);
  }

  uploadMasterApi(filename: string = "") {
    const endpoint = `https://cors-everywhere.herokuapp.com/http://abprojectsservernew-env.eba-pgmbgh3j.us-east-1.elasticbeanstalk.com/presignedURL?fileName=${filename}&folderName=mastersheets&bucketName=abprojects-bucket1`;
    const headers = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        Authorization: localStorage.getItem("abprojectsToken") || "",
      }),
    };

    try {
      this.http
        .post(
          endpoint,
          {
            filename,
            id: this.profiledata?.id,
          },
          headers
        )
        .subscribe((response) => {});
      alert("Successfully uploaded");
    } catch (error) {
      alert("Something went wrong");
    }
  }

  submitForm() {
    this.submitted = true;
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
      // allDay: formValues.allDay,
      attendanceDate: formValues.attendanceDate,
      userId: formValues.userId,
      workerId: formValues.workerId,
      comment: formValues.comment
    };

    const endpoint =
      "https://cors-everywhere.herokuapp.com/http://abprojectsservernew-env.eba-pgmbgh3j.us-east-1.elasticbeanstalk.com/attendance";
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
