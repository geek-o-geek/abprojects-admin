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
    const splitLocation = this.route.snapshot.paramMap.get('location')?.split(",") || [];

    if (splitLocation?.length < 1) return;

    this.lat = +splitLocation[0];
    this.lng = +splitLocation[1];
  }

  goto(route: string = '') {
    this.router.navigateByUrl(route)
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
