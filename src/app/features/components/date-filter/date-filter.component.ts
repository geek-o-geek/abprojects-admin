import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent implements AfterViewInit, OnChanges {
  public fromDt: string = '';
  public toDt: string = '';
  @Input() openModal: boolean = false;
  @Input() modalBodyData: Array<{ [columnName: string]: string; }> = [];
  @Input() exportData: Array<{ [key: string]: string; }> = [];
  @Output() onCloseEvent: EventEmitter<any> = new EventEmitter();
  @Output() onDateFilter: EventEmitter<any> = new EventEmitter();
  @ViewChild('openDateModalButton') openDateModalButton!: ElementRef<HTMLButtonElement>;
  constructor() { }

  ngAfterViewInit(): void {
    if(this.openModal) {
        this.openDateModalButton?.nativeElement?.click();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.openModal?.currentValue && (changes.openModal?.currentValue !== changes.openModal?.previousValue)) {
        this.openDateModalButton?.nativeElement?.click();
    }
  }

  onClose() {
    this.onCloseEvent.emit();
  }

  onSubmit() {
    const filteredData: any = [];

    this.exportData.filter((item) => {
      const object: any = {}

      const createdAt = new Date(item.created_at);
    
      const minDate = new Date(this.fromDt);
      const maxDate =  new Date(this.toDt);
  
      let flag: boolean = false;
      if (minDate && maxDate) {
        if (createdAt > minDate && createdAt < maxDate ){
            flag = true;
        }
      } else {
        flag = true;
      }

      if (flag) {
        // row iteration
        Object.keys(item || {}).forEach(fieldKey => {
          const ob: any = this.modalBodyData.find(obj => obj.field === fieldKey) || {};
          
          if (ob.selected) {
            object[fieldKey] = item[fieldKey];
          }
        });
        filteredData.push(object);
      }
    });

    this.onDateFilter.emit(filteredData);
  }
}
