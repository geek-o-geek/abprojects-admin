import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-export-modal',
  templateUrl: './export-modal.component.html',
  styleUrls: ['./export-modal.component.scss']
})
export class ExportModalComponent implements AfterViewInit, OnChanges {
  public fromDt: string = '';
  public toDt: string = '';
  @Input() openModal: boolean = false;
  @Input() modalBodyData: Array<{ [columnName: string]: string; }> = [];
  @Input() exportData: Array<{ [key: string]: string; }> = [];
  @Output() onCloseEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild('openModalButton') openModalButton!: ElementRef<HTMLButtonElement>;
  constructor() { }

  ngAfterViewInit(): void {
    if(this.openModal) {
        this.openModalButton?.nativeElement?.click();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.openModal?.currentValue && (changes.openModal?.currentValue !== changes.openModal?.previousValue)) {
        this.openModalButton?.nativeElement?.click();
    }
  }

  onClose() {
    this.onCloseEvent.emit();
  }

  onColumnSelect(columnName: string = '') {
    this.modalBodyData = this.modalBodyData.map((item: any): {[key: string]: string } => { 
      if (columnName === item?.columnName) {
        item.selected = !item.selected;
      }
      return item;
     })
  }

  onExport() {
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
    
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(filteredData);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "excel");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(_ => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );

    });

    this.onClose();
  }

}
