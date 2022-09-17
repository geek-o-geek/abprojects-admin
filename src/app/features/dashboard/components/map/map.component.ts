import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  lat!: number;
  lng!: number;
  Events: any[] = [];
  attendanceDetailData: any = [];
  attendanceDetailDataBackup: any = [];
  myDetails: any = [];
  dt: string = "";
  form!: FormGroup;
  wards: any[] = [];
  openedWindow : number = 0;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((item: any) => {
      const { wardId, dt } = item;

      if (wardId === "all") {
        this.attendanceDetailData = [...this.attendanceDetailDataBackup];
        return;
      }

      this.attendanceDetailData = this.attendanceDetailDataBackup.filter(
        (item: any): any => {
          const attendDate = item?.attendanceDate.split("T")[0];

          if (dt === attendDate && item?.wardId === wardId) {
            return item;
          }
        }
      );
    });

    const endpoint =
    `${environment.baseUrl}/get/wards`;
    const headers = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        Authorization: localStorage.getItem("abprojectsToken") || "",
      }),
    };

    this.http.get(endpoint, headers)
    .pipe(take(1))
    .subscribe((res: any) => {
      this.wards = [{ id: "all", ward: "All" }, ...(res?.data || [])];
    });
  }

  ngAfterViewInit() {
    this.dt = new Date().toISOString().split("T")[0];

    const endpoint = `${environment.baseUrl}/attendanceByDate?dt=${
      new Date().toISOString().split("T")[0]
    }`;
    const headers = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        Authorization: localStorage.getItem("abprojectsToken") || "",
      }),
    };

    this.http.get(endpoint, headers)
    .pipe(take(1))
    .subscribe((res: any): void => {
      this.attendanceDetailData = res?.result || [];
      this.attendanceDetailDataBackup = res?.result || [];
      this.updateLocation();
    });
  }

  isInfoWindowOpen(data: any) {
    return this.openedWindow === data?.id;
  }

  openWindow(data: any) {
    this.openedWindow = data?.id || null; 
  }

  updateLocation() {
    this.lat = +this.attendanceDetailData[0]?.startLocation;
    this.lng = +this.attendanceDetailData[0]?.endLocation;
  }

  goto(route: string = "") {
    this.router.navigateByUrl(route);
  }

  createForm() {
    this.form = this.fb.group({
      wardId: [""],
      wardFilter: [""],
      dt: [new Date().toISOString().split("T")[0]],
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }
}
