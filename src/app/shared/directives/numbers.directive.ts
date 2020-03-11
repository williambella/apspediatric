import { Directive, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbers]'
})
export class NumbersDirective {

  constructor(
    private renderer2: Renderer2,
    private element: ElementRef
  ) { }

  @HostListener('input', ['$event']) onInput(event: EventListener) {
    const cleanValue = this.element.nativeElement.value.replace(new RegExp('[^0-9.]', 'g'), '');
    this.renderer2.setProperty(this.element.nativeElement, 'value', cleanValue);
  }
}
