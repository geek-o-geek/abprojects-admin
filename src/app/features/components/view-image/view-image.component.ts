import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent implements AfterViewInit, OnChanges {
  public index: number = 0;
  public imageLink: string = '';
  @Input() openModal: boolean = false;
  @Input() imageSrc: string[] = [];
  @Output() onCloseEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild('openModalButton1') openModalButton1!: ElementRef<HTMLButtonElement>;
  constructor() { }

  ngAfterViewInit(): void {
    if(this.openModal) {
        this.openModalButton1?.nativeElement?.click();
        this.slideImage();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.openModal?.currentValue && (changes.openModal?.currentValue !== changes.openModal?.previousValue)) {
        this.openModalButton1?.nativeElement?.click();
        this.slideImage();
    }
  }

  onClose() {
    this.imageSrc = [];
    this.index = 0;
    this.onCloseEvent.emit();
  }

  slideImage(type: string = '') {
    const imagesLength = (this.imageSrc.length - 1);
    if(type === 'increment') {
      this.index = (this.index === imagesLength) ? 0: ++this.index;
    }

    if(type === 'decrement') {
      this.index = this.index > 0 ? --this.index: imagesLength
    }

    this.imageLink = this.imageSrc[this.index];
  }
}
