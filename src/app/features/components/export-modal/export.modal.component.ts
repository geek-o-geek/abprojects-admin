import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-export-modal',
  templateUrl: './export-modal.component.html',
  styleUrls: ['./export-modal.component.scss']
})
export class ExportModalComponent implements AfterViewInit, OnChanges {
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

  onExport() {
    this.onClose();
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.exportData);
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
  }

}
