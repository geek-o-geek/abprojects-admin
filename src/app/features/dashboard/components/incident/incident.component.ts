import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-incident-report",
  templateUrl: "./incident.component.html",
  styleUrls: ["./incident.component.scss"],
})
export class IncidentComponent implements OnInit {
  data: any = [];
  databackup: any = [];
  tableContent: any = [];
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
      {
        columnName: "Supervisor Name",
        field: "supervisorName",
        selected: true,
      },
      { columnName: "Phone", field: "phone", selected: true },
      { columnName: "Region", field: "region", selected: true },
      {
        columnName: "Ward",
        field: "ward",
        selected: true,
      },
      { columnName: "Incident Date", field: "dateOfIncident", selected: true },
      { columnName: "Incident time", field: "timeOfIncident", selected: true },
      { columnName: "Incident Location", field: "locationIncident", selected: true },
      { columnName: "Incident Description", field: "descriptionIncident", selected: true },
      { columnName: "Medical Problem Text", field: "medicalProblemText", selected: true },
    ];

    const { id = 0 }: any = this.location.getState() || {};

    const endpoint =
      "https://cors-everywhere.herokuapp.com/http://abprojectsservernew-env.eba-pgmbgh3j.us-east-1.elasticbeanstalk.com/incidents";
    const headers = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        Authorization: localStorage.getItem("abprojectsToken") || "",
      }),
    };

    this.http.get(endpoint, headers).subscribe((res: any): void => {
      let data = res.data || [];

      if (id) {
        const dataFiltered: any = data?.supervisor?.filter(
          (item: any) => item?.wardId === id
        );
        this.tableContent = dataFiltered;
        this.databackup = dataFiltered;
      } else {
        this.tableContent = [...data];
        this.databackup = [...data];
      }
    });
  }

  search(e: any) {
    if (e.target.value === "") {
      return (this.tableContent = { ...this.databackup });
    }
    const roadInspection = this.databackup?.filter(
      (obj: any, index: number) =>
        obj.supervisorName?.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
    );

    this.tableContent = [...roadInspection];
  }

  goto(route: string = "", item: any = {}) {
    const loc: string = item?.startLocation + ":_:" + item?.location;
    this.router.navigate([route, loc]);
  }

  toggleDateModal() {
    this.openDateModal = !this.openDateModal;
  }

  dateFilter(data: any) {
    if (!data) return;

    this.tableContent = data;
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }

  toggleModal() {
    this.openModal = !this.openModal;
  }
}
