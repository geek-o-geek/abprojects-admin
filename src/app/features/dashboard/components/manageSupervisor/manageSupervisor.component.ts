import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-supervisor',
  templateUrl: './manageSupervisor.component.html',
  styleUrls: ['./manageSupervisor.component.scss']
})
export class ManageSupervisorComponent implements OnInit {
  form!: FormGroup;
  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private router: Router) {
      this.createForm();
    }

  ngOnInit(): void {
      
  }

  createForm() {
    this.form = this.fb.group({
      member_no: ['', Validators.compose([Validators.required])],
      surname: ['', Validators.compose([Validators.required])],
      first_name: ['', Validators.compose([Validators.required])],
      initials: ['', Validators.compose([Validators.required])],
      area: ['', Validators.compose([Validators.required])],
      phone_no: ['', Validators.compose([Validators.required])],
      safety_boots: ['', Validators.compose([Validators.required])],
      education: ['', Validators.compose([Validators.required])],
      dependants: ['', Validators.compose([Validators.required])],
      overseer_verified: false,
      date_verified: [null, Validators.compose([Validators.required])],
      bank_name: ['', Validators.compose([Validators.required])],
      account_no: ['', Validators.compose([Validators.required])],
      branch_code: ['', Validators.compose([Validators.required])],
      branch_name: ['', Validators.compose([Validators.required])]
    })
  }

  submitForm() {
    const formValues: any = this.form.value;

    
  }

  goto(route: string = '', item: any = {}) {
    this.router.navigateByUrl(route, { state: item });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  

}
