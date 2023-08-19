import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[colored-back]'
})
export class ColoredBackDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.changeBackgroundColor('rgba(56, 128, 255, 0.2)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeBackgroundColor('');
  }

  private changeBackgroundColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }

 }

