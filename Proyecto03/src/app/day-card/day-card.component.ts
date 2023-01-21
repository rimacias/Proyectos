import { Component } from '@angular/core';
import { Card } from '../interfaz/card';
import { RecursosService } from '../servicios/recursos.service';

@Component({
  selector: 'app-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.css']
})
export class DayCardComponent {
  cards: any[] = [];
  dayCard: any = {};
  constructor(private recursosService: RecursosService) {
    recursosService.randomCard().subscribe(respuesta => {
      this.dayCard = respuesta;
      console.log(this.dayCard);
    })
  }
}
