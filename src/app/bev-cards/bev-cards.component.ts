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
  private cardArr = []
  private cardId: number;
  constructor(private bevCardService: BevCardService) { }

  ngOnInit() {
    this.sendCardsGet()
  }

  sendCardsGet(): any{
    this.bevCardService.getCardFetch().subscribe(data => {
      this.cardArr = data.card;
      console.log(this.cardArr);
    })
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

  deleteConfirmation(cardId?: number): void{
    if(cardId){
      this.cardId = cardId
    }
    if(document.getElementById("deleteConfirmation").style.display == "none"){
      document.getElementById("deleteConfirmation").style.display = "block"
    } else {
      document.getElementById("deleteConfirmation").style.display = "none"
    }
  }

  sendDeleteFetch(cardId: number): void{
    return this.bevCardService.deleteCard(cardId).subscribe(console.log("Success"));
  }
}
