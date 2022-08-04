import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-supervisor",
  templateUrl: "./supervisor.component.html",
  styleUrls: ["./supervisor.component.scss"],
})
export class SupervisorComponent implements OnInit {
  profiledata: any = {};
  profileImage: string = "";
  data: any = {};
  databackup: any = {};
  openModal: boolean = false;
  constructor(
    private http: HttpClient,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const { id = 0 }: any = this.location.getState() || {};

    const endpoint =
      "https://cors-everywhere.herokuapp.com/http://abprojectsserver-env.eba-5pjjn569.us-east-1.elasticbeanstalk.com/master/get?type=all";
    const headers = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        Authorization: localStorage.getItem("abprojectsToken") || "",
      }),
    };

    this.http.get(endpoint, headers).subscribe((res: any): void => {
      let data = res.data || {};

      if (id) {
        const dataFiltered: any = data?.supervisor?.filter(
          (item: any) => item?.wardId === id
        );
        this.data = dataFiltered;
        this.databackup = dataFiltered;
      } else {
        this.data = data?.supervisor;
        this.databackup = data?.supervisor;
      }
    });
  }

  toggleModal() {
    this.openModal = !this.openModal;
  }

  search(e: any) {
    if (e.target.value === "") {
      return (this.data = { ...this.databackup });
    }
    const supervisor = this.databackup?.filter(
      (obj: any, index: number) =>
        obj.fullname?.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
    );

    this.data = supervisor;
  }

  goto(route: string = "", item: any = {}) {
    this.router.navigateByUrl(route);
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }

  openModalFunction() {
    this.openModal = true;
  }

  changePin(item: any) {
    this.openModalFunction();
  }
}
