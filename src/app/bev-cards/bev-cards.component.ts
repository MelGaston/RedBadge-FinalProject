import { Component, OnInit, Input } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

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
  public modelTitle: string;
  // public name: string;
  // private _type: string;
  // private temp: number;
  // private time: number;
  // private _servingSize: string;        trying to get two way binding to work so we can get the edit button to
  // private _ingredients: string;        add the value of each card to the input fields of the model when edit is clicked
  // private _flavor: string;
  // private _notes: string;


  //   @Input() name: any;

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

  open(content?, cardId?: number) {
    if(content){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result;

      if(cardId){
        this.modelTitle = "Edit Beverage"
        document.getElementById("submitButton").style.display = "none";
        document.getElementById("clickButton").style.display = "block";
        this.cardId = cardId;
      } else {
        this.modelTitle = "Add to My Beverages";
      }
    } else {
      this.modalService.dismissAll()
    }
  }

  sendCardUpdate(cardId: number, bevName: string, temp: number, time: number, servingSize: string, ingredients: string, flavor: string, type: string, notes?: string): any{
    console.log(cardId, bevName)
    let card: Cards | CardsNoNotes;

    if(notes){
      card = {
        carddata:{
          bevName: bevName,
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
          bevName: bevName,
          temp: temp,
          prepTime: time,
          servingSize: servingSize,
          ingredients: ingredients,
          flavorProfile: flavor,
          type: type
        }
      }
    }

    this.bevCardService.updateCardFetch(card, cardId).subscribe(data => {
      console.log(data)
    })
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

  // deleteConfirmation(cardId?: number): void{
  //   if(cardId){
  //     this.cardId = cardId
  //   }
  //   if(document.getElementById("deleteConfirmation").style.display == "none"){
  //     document.getElementById("deleteConfirmation").style.display = "block"
  //   } else {
  //     document.getElementById("deleteConfirmation").style.display = "none"
  //   }
  // }

  sendDeleteFetch(cardId: number): void{
    console.log(cardId);
    return this.bevCardService.deleteCard(cardId).subscribe(console.log("Success"));
  }
}