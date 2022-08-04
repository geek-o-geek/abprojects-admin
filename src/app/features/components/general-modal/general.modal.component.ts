import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-general-modal',
  templateUrl: './general-modal.component.html',
  styleUrls: ['./general-modal.component.scss']
})
export class GeneralModalComponent implements AfterViewInit, OnChanges, OnInit {
  form!: FormGroup;
  isSuccess: boolean = false;
  submitted: boolean = false;
  @Input() openModal: boolean = false;
  @Input() modalBodyData: Array<{ [columnName: string]: string; }> = [];
  @Input() exportData: any = {};
  @Output() onCloseEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild('openModalButtonPin') openModalButtonPin!: ElementRef<HTMLButtonElement>;
  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngAfterViewInit(): void {
   
  }

  ngOnInit(): void {
    this.openModalButtonPin?.nativeElement?.click();
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.openModal?.currentValue && (changes.openModal?.currentValue !== changes.openModal?.previousValue)) {
      this.openModalButtonPin?.nativeElement?.click();
    }
  }

  onClose() {
    this.onCloseEvent.emit();
  }

  submitForm() {
    this.isSuccess = false;
      this.submitted = true;
      if (this.form.invalid) {
        return;
      }
  
      const formValues: any = this.form.value;
  
      const payload = {
        mobile: formValues.mobile,
        password: formValues.password,
        id: this.exportData.id
      };
  
      const endpoint =
        "https://cors-everywhere.herokuapp.com/http://abprojectsserver-env.eba-5pjjn569.us-east-1.elasticbeanstalk.com/changePin";
      
      const headers = {
        headers: new HttpHeaders({
          "Content-type": "application/json",
          Authorization: localStorage.getItem("abprojectsToken") || "",
        }),
      };
  
      this.http.post(endpoint, payload, headers)
      .subscribe(
        (res: any): void => {
          this.submitted = false;
          this.form.reset();
          this.isSuccess = true;
          this.onCloseEvent.emit();
        },
        _ => {
          this.submitted = false;
          alert("Some error while updating");
      });
  }

  createForm() {
    this.form = this.fb.group({
      password: ['', Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.required])],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
