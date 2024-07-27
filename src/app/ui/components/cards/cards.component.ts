import { Component } from '@angular/core';
import {NgFor} from '@angular/common'

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [NgFor],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {



}
