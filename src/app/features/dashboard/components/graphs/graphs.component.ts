import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { take } from 'rxjs/operators';

@Component({
  selector: 'graph-dashboard',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent {
  single: any[] = []
  view: [number, number] = [1150, 400];
  ageResult: any[] = []

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = 'below';

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28']
  };

  // options
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Count';
  showYAxisLabel = true;
  yAxisLabel = 'Age';

 

  constructor(private http: HttpClient) {
    
  }

  ngOnInit() {
    const endpoint = "https://cors-everywhere.herokuapp.com/http://abprojectsserver-env.eba-5pjjn569.us-east-1.elasticbeanstalk.com/graphs";
    const headers = {headers: new HttpHeaders({ "Content-type": "application/json", "Authorization": localStorage.getItem("abprojectsToken") || '' })}

    this.http.get(endpoint, headers)
    .pipe(take(1))
    .subscribe((res: any): void => {
     const { data = {} } = res || {};

     this.single = [
      { name: 'female', value: data.femaleCount },
      { name: 'male', value: data.maleCount }
     ]

     this.ageResult = data?.ageDemographic || []

     Object.assign(this, { single: this.single });
     Object.assign(this, { ageResult: this.ageResult });
    })
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}