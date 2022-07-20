import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent implements AfterViewInit, OnChanges {
  @Input() openModal: boolean = false;
  @Input() imageSrc: string = 'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI';
  @Output() onCloseEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild('openModalButton1') openModalButton1!: ElementRef<HTMLButtonElement>;
  constructor() { }

  ngAfterViewInit(): void {
    if(this.openModal) {
        this.openModalButton1?.nativeElement?.click();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.openModal?.currentValue && (changes.openModal?.currentValue !== changes.openModal?.previousValue)) {
        this.openModalButton1?.nativeElement?.click();
    }
  }

  onClose() {
    this.imageSrc = '';
    this.onCloseEvent.emit();
  }

}
