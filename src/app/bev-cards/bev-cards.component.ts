import { Component, OnInit } from '@angular/core';

import { BevCardService } from "../services/bev-card.service";
import { Cards } from "../models/cards.model";
import { CardsNoNotes } from "../models/cardsNoNotes.model";

import { MatDialog } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
  private cardArr = []
  private cardId: number;

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

  constructor(private bevCardService: BevCardService, public dialog: MatDialog, private modalService: NgbModal) { }

  ngOnInit() {
    this.sendCardsGet()
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result;
  }

  // openModal() {
  //   const dialogRef = this.dialog.open(ModalDialog);
  // }

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