import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

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
    this.profiledata = JSON.parse(
      localStorage.getItem("profileabworker") || "{}"
    );
    this.profileImage = this.profiledata?.profileImage
      ? `https://abprojects-bucket1.s3.amazonaws.com/${this.profiledata?.profileImage}`
      : "";
    this.idCard = this.profiledata?.idCard
      ? `https://abprojects-bucket1.s3.amazonaws.com/${this.profiledata?.idCard}`
      : "";
    this.contract = this.profiledata?.contract
      ? `https://abprojects-bucket1.s3.amazonaws.com/${this.profiledata?.contract}`
      : "";

    this.createForm();
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

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get autoPassword() {
    var digits = "0123456789";
    let password = "";
    for (let i = 0; i < 4; i++) {
      password += digits[Math.floor(Math.random() * 10)];
    }
    return password;
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

    const endpoint = `https://cors-everywhere.herokuapp.com/http://abprojectsservernew-env.eba-pgmbgh3j.us-east-1.elasticbeanstalk.com//presignedURL?fileName=${filename}&folderName=mastersheets&bucketName=abprojects-bucket1`;
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
    const endpoint = `https://cors-everywhere.herokuapp.com/http://abprojectsservernew-env.eba-pgmbgh3j.us-east-1.elasticbeanstalk.com//presignedURL?fileName=${filename}&folderName=mastersheets&bucketName=abprojects-bucket1`;
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

  submitForm() {}

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
