import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
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
  wardsResult: any [] = []

  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = 'below';

  colorScheme: any = {
    domain: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']
  };

  // options
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Age';
  showYAxisLabel = true;
  yAxisLabel = 'Count';

  xAxisLabelA = 'Wards';
  yAxisLabelB = 'Educational Levels';
  educationResult: any[] = []
  dependantsResult: any[] = [];
  xAxisLabelDependants: string = 'Dependants'

  legendTitle: string = 'Years';


  roadInspection: any = []
  xAxisLabelRoad: string = "Ward";
  yAxisLabelRoad: string = "Satisfactory Rating";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const endpoint = "https://cors-everywhere.herokuapp.com/http://abprojectsservernew-env.eba-pgmbgh3j.us-east-1.elasticbeanstalk.com//graphs";
    const headers = {headers: new HttpHeaders({ "Content-type": "application/json", "Authorization": localStorage.getItem("abprojectsToken") || '' })}

    this.http.get(endpoint, headers)
    .pipe(take(1))
    .subscribe((res: any): void => {
     const { data = {} } = res || {};

     this.single = [
      { name: 'female', value: data.femaleCount },
      { name: 'male', value: data.maleCount }
     ]

     this.ageResult = (data?.ageDemographic || []).filter((obj: any) => obj.name != null)
     this.wardsResult = (data?.wardsDemographic || []).filter((obj: any) => obj.name != null)
     this.educationResult = (data?.educationDemographic || []).filter((obj: any) => obj.name != null)
     this.dependantsResult = (data?.dependantsDemographic || []).filter((obj: any) => obj.name != null)

     const nameList = Array.from(new Set(data.roadInspection.map((item: any) => item.name)));

     const keyObject: any = {
      "Satisfactory": 1,
      "Needs Improvement": 2,
      "Not Satisfactory": 3,
      "Not Applicable": 4
    }

     nameList.forEach((name: any) => {
  
      const all = data.roadInspection
                  .filter((item: any) => name === item.name )
                  .map((item: any) => { 
                      let list: any = []
                      Object.keys(item).forEach(key => {
                        if (key != 'name') {
                          const value = item[key]?.split(",").reduce((acc:any, elem:any) => {
                            if (keyObject[elem]) {
                              acc += keyObject[elem]
                            }
                            return acc
                          }, 0) / item[key]?.split(",").length;
                         
                         list.push({
                            name: key, 
                            value
                          })
                          
                        }
                      })

                    if(list.length)
                      return list
                   });

      this.roadInspection.push({
        name,
        series: all[0]
      })
     });

     Object.assign(this, { single: this.single });
     Object.assign(this, { ageResult: this.ageResult });
     Object.assign(this, { wardsResult: this.wardsResult });
     Object.assign(this, { educationResult: this.educationResult })
     Object.assign(this, { dependantsResult: this.dependantsResult })
     Object.assign(this, { roadInspection: JSON.parse(JSON.stringify(this.roadInspection)) })
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