import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import {Housinglocation} from "../housinglocation";
import { HousingService } from '../housing.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location *ngFor="let housingLocation of filterHousingLocationList" [housingLocation]="housingLocation"></app-housing-location>
  </section>
  `,
  styleUrl: './home.component.css'
})

export class HomeComponent {
  public housingLocationList:Housinglocation[]=[];
  public filterHousingLocationList:Housinglocation[]=[];

  constructor(public housingService:HousingService){
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filterHousingLocationList = this.housingLocationList;
  }

  public filterResults(text:string){
    if(!text){
      this.filterHousingLocationList = this.housingLocationList;
      return;
    }
    this.filterHousingLocationList = this.housingLocationList.filter(house=>house.city.toLowerCase().includes(text));
  }
}
