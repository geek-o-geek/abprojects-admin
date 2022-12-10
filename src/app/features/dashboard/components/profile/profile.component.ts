import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  uploadedFiles: any;
  profiledata: any = {};
  profileImage: string = "";
  idCard: string = "";
  contract: string = "";
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.profiledata = JSON.parse(
      localStorage.getItem("profileabworker") || "{}"
    );
    this.profileImage = this.profiledata?.profileImage
      ? `https://abprojects-bucket11.s3.amazonaws.com/${this.profiledata?.profileImage}`
      : "";
    this.idCard = this.profiledata?.idCard
      ? `https://abprojects-bucket11.s3.amazonaws.com/${this.profiledata?.idCard}`
      : "";
    this.contract = this.profiledata?.contract
      ? `https://abprojects-bucket11.s3.amazonaws.com/${this.profiledata?.contract}`
      : "";
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

    const endpoint = `${environment.baseUrl}/presignedURL?fileName=${filename}&folderName=mastersheets&bucketName=abprojects-bucket11`;
    const headers = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        Authorization: localStorage.getItem("abprojectsToken") || "",
      }),
    };

    this.http.get(endpoint, headers)
    .pipe(take(1))
    .subscribe((response) => {
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
    const endpoint = `${environment.baseUrl}/presignedURL?fileName=${filename}&folderName=mastersheets&bucketName=abprojects-bucket11`;
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
        .pipe(take(1))
        .subscribe((response) => {});
      alert("Successfully uploaded");
    } catch (error) {
      alert("Something went wrong");
    }
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
