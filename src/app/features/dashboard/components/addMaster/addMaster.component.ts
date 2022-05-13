import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-master',
  templateUrl: './addMaster.component.html',
  styleUrls: ['./addMaster.component.scss']
})
export class AddMasterComponent implements OnInit {
  uploadedFiles: any;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  fileChange(element: any) {
    this.uploadedFiles = element.target.files;
    this.upload();
  }
  
  upload() {
    const endpoint = `https://cors-everywhere.herokuapp.com/http://abprojectsserver-env.eba-5pjjn569.us-east-1.elasticbeanstalk.com/presignedURL?fileName=master&folderName=mastersheets&bucketName=abprojects-bucket1`;
    const headers = {headers: new HttpHeaders({ "Content-type": "application/json", "Authorization": localStorage.getItem("abprojectsToken") || '' })}

    this.http.get(endpoint, headers)
      .subscribe((response) => {
      this.uploadS3(response);
    })
  }

  uploadS3(data: any) {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
      }
    });

    xhr.open("PUT", data?.uploadUrl);
    xhr.setRequestHeader("content-type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    xhr.setRequestHeader("key", data?.filePath);
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.onload = () => {
      if (xhr.status === 200) {
        //nav
      }
    };
    xhr.onerror = () => {
      alert('some error while uploading')
    };
    xhr.send(this.uploadedFiles);
  }

  goto(route: string = '') {
    this.router.navigateByUrl(route)
  }
  

}
