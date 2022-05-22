import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss']
})
export class SupervisorComponent implements OnInit {
  uploadedFiles: any;
  profiledata: any = {};
  profileImage: string = '';
  data: any = {}
  databackup: any = {}
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const endpoint = "https://cors-everywhere.herokuapp.com/http://abprojectsserver-env.eba-5pjjn569.us-east-1.elasticbeanstalk.com/master/get";
    const headers = {headers: new HttpHeaders({ "Content-type": "application/json", "Authorization": localStorage.getItem("abprojectsToken") || '' })}

    this.http.get(endpoint, headers)
    .subscribe((res: any): void => {
     this.data = res.data
     this.databackup = res.data
    })
  }

  thisFileUploadchange(element: any) {
    this.uploadedFiles = element.target.files[0];
    this.upload()
  }

  search(e: any) {

  }
  
  upload() {
    if (!this.uploadedFiles) {
      alert('file is mandatory');
      return;
    }
    const filename = this.uploadedFiles.name;

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
    xhr.setRequestHeader("content-type", "image/jpeg");
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
    const endpoint = `https://cors-everywhere.herokuapp.com/http://abprojectsserver-env.eba-5pjjn569.us-east-1.elasticbeanstalk.com/upload/profile`;
    const headers = {headers: new HttpHeaders({ "Content-type": "application/json", "Authorization": localStorage.getItem("abprojectsToken") || '' })}

    try {
      this.http.post(endpoint, {
        filename,
        id: this.profiledata?.id
      }, headers)
      .subscribe((response) => {
        
    })
      alert('Successfully uploaded');
    } catch (error) {
      alert('Something went wrong');
    }
  };

  thisFileUpload() {
    document.getElementById("file")?.click();
  };

  goto(route: string = '', item: any = {}) {
    this.router.navigateByUrl(route)
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  

}
