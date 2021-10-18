import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-celda',
  templateUrl: './celda.component.html',
  styleUrls: ['./celda.component.css']
})
export class CeldaComponent implements OnInit{

  @Input('valorCelda') valorCelda: number = 0;
  
  constructor(private element: ElementRef,
      private render: Renderer2) { }

  ngOnInit(): void {

    if (Boolean(this.valorCelda)) {
      this.render.setStyle(this.element.nativeElement, 'background-color', 'white');
    } else {
      this.render.setStyle(this.element.nativeElement, 'background-color', 'black');
    }
  }
  
}
