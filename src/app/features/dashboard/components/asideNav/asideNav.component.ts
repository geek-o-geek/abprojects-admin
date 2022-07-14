import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './asideNav.component.html',
  styleUrls: ['./asideNav.component.scss']
})
export class AsideNavComponent implements OnInit {
  data: any = {}
  databackup: any = {};
  activeMenuItem: string = 'dashboard';
  constructor(private router: Router) { }

  ngOnInit(): void {}

  search(e: any) {
    if(e.target.value === '') {
      return this.data = { ...this.databackup }
    }
    const worker = this.databackup?.filter((obj: any, index: number) => obj.fullname?.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0 );
   
    this.data = { ...this.data, worker }
  }

  goto(route: string = '', activeMenuItem: string = '') {
    this.activeMenuItem = activeMenuItem;
    this.router.navigateByUrl(route)
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
