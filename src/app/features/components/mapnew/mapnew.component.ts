import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mapnew',
  templateUrl: './mapnew.component.html',
  styleUrls: ['./mapnew.component.scss']
})
export class MapNewComponent implements OnInit {
  lat!: number;
  lng!: number;
  Events: any[] = [];
  myDetails: any = [];
  dt: string = '';
  wards: any[] = []
  latEnd!: number;
  lngEnd!: number;
  origin!: any;
  destination!: any;
  travelMode: any = "WALKING";

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) {
      console.log(route.snapshot.paramMap.get('location'), "route.snapshot.data")
  }
  
  ngOnInit() {
    this.updateLocation();;
  }

  ngAfterViewInit() {
    this.updateLocation();
  }

  updateLocation() {
    try {
      let splitLocation = this.route.snapshot.paramMap.get('location')?.split(":_:") || [];

      if (splitLocation?.length < 1) return;
  
      const splitLocationA = splitLocation[0]?.split(",") || [];
      const splitLocationB = splitLocation[1]?.split(",") || [];

      this.lat = +splitLocationA[0];
      this.lng = +splitLocationA[1];
      
      this.latEnd = +splitLocationB[0];
      this.lngEnd = +splitLocationB[1];

      this.getPolygonMapPoints(); 
    } catch (error) {
      
    }
  }

  getPolygonMapPoints() {
    this.origin = { lat: this.lat, lng: this.lng };
    this.destination = { lat: this.latEnd, lng: this.lngEnd };
  }

  goto(route: string = '') {
    this.router.navigateByUrl(route)
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
