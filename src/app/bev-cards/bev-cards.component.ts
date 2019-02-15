import { Component, OnInit } from '@angular/core';

import {BevCardService} from "../services/bev-card.service";
import {Cards} from "../models/cards.model";
import {CardsNoNotes} from "../models/cardsNoNotes.model";

@Component({
  selector: 'app-bev-cards',
  templateUrl: './bev-cards.component.html',
  styleUrls: ['./bev-cards.component.css']
})
export class BevCardsComponent implements OnInit {

  constructor(private bevCardService: BevCardService) { }

  ngOnInit() {
    this.sendCardsGet()
  }

  sendCardsGet(): any{
    this.bevCardService.getCardFetch().subscribe(data => console.log(data))
  }

  sendCardPost(name: string, temp: number, time: number, servingSize: string, ingredients: string, flavor: string, type: string, notes?: string){
    event.preventDefault();
    let card: Cards | CardsNoNotes;
    if(notes){
      card = {
        carddata:{
          bevName: name,
          temp: temp,
          prepTime: time,
          servingSize: servingSize,
          ingredients: ingredients,
          flavorProfile: flavor,
          notes: notes,
          type: type
        }
      }
    } else {
      card = {
        carddata:{
          bevName: name,
          temp: temp,
          prepTime: time,
          servingSize: servingSize,
          ingredients: ingredients,
          flavorProfile: flavor,
          type: type
        }
      }
    }
    
    this.bevCardService.createCardFetch(card).subscribe(data => console.log(data))
  }
}
