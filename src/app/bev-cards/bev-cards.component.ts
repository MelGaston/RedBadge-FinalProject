import { Component, OnInit } from '@angular/core';

import { BevCardService } from "../services/bev-card.service";
import { Cards } from "../models/cards.model";
import { CardsNoNotes } from "../models/cardsNoNotes.model";

import { MatDialog } from '@angular/material';

export interface BevType {
  value: string;
  viewValue: string;
}

export interface ServSize {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-bev-cards',
  templateUrl: './bev-cards.component.html',
  styleUrls: ['./bev-cards.component.css']
})

export class BevCardsComponent implements OnInit {

  constructor(private bevCardService: BevCardService, public dialog: MatDialog) { }

  ngOnInit() {
    this.sendCardsGet()
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalDialog);
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

@Component({
  selector: 'modal-content',
  templateUrl: 'modal-content.component.html',
})

export class ModalDialog {
  beverages: BevType[] = [
    {value: 'coffee', viewValue: 'Coffee'},
    {value: 'tea', viewValue: 'Tea'},
    {value: 'miscellaneous', viewValue: 'Other'}
  ];

  sizes: ServSize[] = [
    {value: '8', viewValue: '8 oz.'},
    {value: '12', viewValue: '12 oz.'},
    {value: '16', viewValue: '16 oz.'},
    {value: '20', viewValue: '20 oz.'}
  ]
}