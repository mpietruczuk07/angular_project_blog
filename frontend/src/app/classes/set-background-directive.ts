import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[setBackground]'
})

export class SetBackgroundDirective {
    constructor(element: ElementRef) {
        element.nativeElement.style.backgroundColor = '#EFEFEF';
    }
}