import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { take } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-payment-schedule",
  templateUrl: "./paymentSchedule.component.html",
  styleUrls: ["./paymentSchedule.component.scss"],
})
export class PaymentScheduleComponent implements OnInit {
  data: any = [];
  databackup: any = [];
  tableContent: any = [];
  selectedMonth: any;
  openModal: boolean = false;
  openDateModal: boolean = false;
  modalBodyData: any = [];
  exportData: any = [];
  constructor(
    private http: HttpClient,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.modalBodyData = [
      { columnName: "Worker Name", field: "fullname", selected: true },
      { columnName: "Worker ID", field: "said", selected: true },
      { columnName: "Amount", field: "payableDays", selected: true },
      { columnName: "Last Name", field: "lastname", selected: true },
      { columnName: "Initials", field: "initials", selected: true },
      { columnName: "ID Number", field: "said", selected: true },
      { columnName: "First-Second Name", field: "fullname", selected: true },
      { columnName: "Level", field: "jobTitle", selected: true },
      { columnName: "Rate Of Pay", field: "amountPaid", selected: true }
    ];
    this.selectedMonth = new Date().getMonth() + 1;
    this.getData();
  }

  toggleModal() {
    this.openModal = !this.openModal;
  }

  toggleDateModal() {
    this.openDateModal = !this.openDateModal;
  }

  dateFilter(data: any) {
    if (!data) return;

    this.data = data;
  }

  getData() {
    const endpoint = `${environment.baseUrl}/attendancenWorkerByMonth?month=${this.selectedMonth}`;
    const headers = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        Authorization: localStorage.getItem("abprojectsToken") || "",
      }),
    };

    this.http.get(endpoint, headers)
    .pipe(take(1))
    .subscribe((res: any): void => {
      let data = res.result || [];
      data = data.filter(
        (item: any) => item.fullname != "" || item.fullname != null
      );
      this.tableContent = [...data];
      this.databackup = [...data];
    });
  }

  search(e: any) {
    if (e.target.value === "") {
      return (this.tableContent = [...this.databackup]);
    }
    const roadInspection = this.databackup?.filter(
      (obj: any, index: number) =>
        obj.fullname?.toLowerCase().indexOf(e.target.value.toLowerCase()) >=
          0 ||
        obj.said?.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
    );

    this.tableContent = [...roadInspection];
    return;
  }

  goto(route: string = "", item: any = {}) {
    if (route === "/dashboard/profile") {
      localStorage.setItem("profileabworker", JSON.stringify(item));
    }
    this.router.navigateByUrl(route);
  }

  setMonth(value: any) {
    this.selectedMonth = value;
    this.getData();
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }
}
