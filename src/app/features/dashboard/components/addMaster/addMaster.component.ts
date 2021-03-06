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
    this.uploadedFiles = element.target.files[0];
  }
  
  upload() {
    if (!this.uploadedFiles) {
      alert('file is mandatory');
      return;
    }
    const filename = this.uploadedFiles.name.split('.xlsx')[0];

    const endpoint = `https://cors-everywhere.herokuapp.com/http://abprojectsserver-env.eba-5pjjn569.us-east-1.elasticbeanstalk.com/presignedURL?fileName=${filename}&folderName=mastersheets&bucketName=abprojects-bucket1`;
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
        this.uploadMasterApi(data?.filePath)
      }
    };
    xhr.onerror = () => {
      alert('some error while uploading')
    };
    xhr.send(this.uploadedFiles);
  }

  uploadMasterApi(filename: string = '') {
    const endpoint = `https://cors-everywhere.herokuapp.com/http://abprojectsserver-env.eba-5pjjn569.us-east-1.elasticbeanstalk.com/upload/master`;
    const headers = {headers: new HttpHeaders({ "Content-type": "application/json", "Authorization": localStorage.getItem("abprojectsToken") || '' })}

    try {
      this.http.post(endpoint, {
        filename,
      }, headers)
      .subscribe((response) => {
        
    })
      alert('Successfully uploaded Master Data');
    } catch (error) {
      alert('Something went wrong');
    }
  };

  goto(route: string = '') {
    this.router.navigateByUrl(route)
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  

}
