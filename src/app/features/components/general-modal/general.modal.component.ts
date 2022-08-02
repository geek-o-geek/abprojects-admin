import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-general-modal',
  templateUrl: './general-modal.component.html',
  styleUrls: ['./general-modal.component.scss']
})
export class GeneralModalComponent implements AfterViewInit, OnChanges {
  form!: FormGroup;
  submitted: boolean = false;
  @Input() openModal: boolean = false;
  @Input() modalBodyData: Array<{ [columnName: string]: string; }> = [];
  @Input() exportData: Array<{ [key: string]: string; }> = [];
  @Output() onCloseEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild('openModalButtonPin') openModalButtonPin!: ElementRef<HTMLButtonElement>;
  constructor(private fb: FormBuilder) { }

  ngAfterViewInit(): void {
    if(this.openModal) {
      this.createForm();
      this.openModalButtonPin?.nativeElement?.click();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.openModal?.currentValue && (changes.openModal?.currentValue !== changes.openModal?.previousValue)) {
        this.openModalButtonPin?.nativeElement?.click();
    }
  }

  onClose() {
    this.onCloseEvent.emit();
  }

  onExport() {
   
  }

  submitForm() {
    this.submitted = true;
  }

  createForm() {
    this.form = this.fb.group({
      password: [this.autoPassword, Validators.compose([Validators.required])],
    })
  }
  
  get autoPassword() {
    var digits = '0123456789';
    let password = '';
    for (let i = 0; i < 4; i++ ) {
      password += digits[Math.floor(Math.random() * 10)];
    }
    return password; 
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
