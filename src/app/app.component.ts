import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSelectModule,} from '@angular/material/select'
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatListModule} from '@angular/material/list'; 
import { MapComponentComponent } from './map-component/map-component.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips'
import { MatCarouselModule } from '@nunomeirelesjumia/material-carousel';
import { Ship } from './map-component/map-component.model';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,MapComponentComponent,MatSelectModule, MatSidenavModule, MatListModule, MatIconModule, MatTooltipModule,
    MatCarouselModule, MatButtonModule,MatTabsModule,MatChipsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  constructor(
    private matIconRegistry:MatIconRegistry,
    private domSanitizer: DomSanitizer
  ){
    this.matIconRegistry.addSvgIcon(
      "station",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/station.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "union",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/gms.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "armory",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/ha.svg")
    );
  }
  isExpanded:boolean = false
  displayTabs:boolean = false
  tabIdx:number = 0

  activeShip!: Ship | null;

  logos: Record<string,string> = {
    "Union Navy":'union',
    "Harrison Armory":'armory'
  }

  markerData: Ship[] =  [
    {
      name:"UNS-CV Chao Praya",
      rotation:45,
      position: [200,200],
      faction:"Union Navy",
      class:"GMS Amazon-Class Carrier"
    }  ,
    {
      name:"PCV-SL Atalanta",
      rotation:12,
      position: [-200,200],
      faction:"Harrison Armory",
      class:"HA Wagner-Class Corvette"
    }
    ]


  @ViewChild(MapComponentComponent) mapComponent!: MapComponentComponent

  ngAfterViewInit(){
    console.log(this.mapComponent)
  }

  flyToLandmark(){
    this.mapComponent.map.flyTo([0,0],2)
  }

  handleMapClick(event:string){
    console.log(event)
    this.displayVessels()
    this.isExpanded = true
    this.activeShip = this.markerData.find(e => e.name === event) || null
  }

  displayInfo(){
   
    if(this.tabIdx == 0 && this.isExpanded){
      this.isExpanded = false
    }
    else{
      this.isExpanded = true
    }
    this.tabIdx = 0 
  }

  displayFactions(){
    
    if(this.tabIdx == 1 && this.isExpanded){
      this.isExpanded = false
    }
    else{
      this.isExpanded = true
    }
    this.tabIdx = 1
  }

  displayLandmarks(){
    if(this.tabIdx == 2 && this.isExpanded){
      this.isExpanded = false
    }
    else{
      this.isExpanded = true
    }
    this.tabIdx = 2
  }

  displayVessels(){
    if(this.tabIdx == 3 && this.isExpanded){
      this.isExpanded = false
    }
    else{
      this.isExpanded = true
    }
    this.tabIdx = 3
  }

  getActiveShipIcon(){
    if(this.activeShip && this.activeShip.faction){
      return this.logos[this.activeShip.faction]

    }
    else{
      return '';
    }
  }
  
}
