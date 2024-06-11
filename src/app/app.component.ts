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

    for (const key in this.iconStrings){
      const data = this.iconStrings[key]
      this.matIconRegistry.addSvgIcon(
        key,this.domSanitizer.bypassSecurityTrustResourceUrl(data)
      )
    }
  }

  iconStrings: Record<string,string> = {
    "union":"assets/gms.svg",
    "armory":"assets/ha.svg",
    "barony":"assets/barony.svg",
    "albatross":"assets/albatross.svg",
    "ssc":"assets/ssc.svg"
  }

  isExpanded:boolean = false
  displayTabs:boolean = false
  tabIdx:number = 0

  activeShip!: Ship | null;

  logos: Record<string,string> = {
    "Union Navy":'union',
    "Harrison Armory":'armory',
    "SSC":'ssc'
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
    },
    {
      name:"C-HK Auburn Heart",
      rotation: 75,
      position: [200,-200],
      faction:"SSC",
      class:"SSC Empyrean-Class Skyhook"
    }
    ]


  @ViewChild(MapComponentComponent) mapComponent!: MapComponentComponent

  ngAfterViewInit(){
  }

  flyToLandmark(){
    this.mapComponent.map.flyTo([0,0],2)
  }

  handleMapClick(event:string){
    console.log(event)
    this.displayVessels()
    this.activeShip = this.markerData.find(e => e.name === event) || null
    this.tabIdx=3
    this.isExpanded = true
  }

  displayInfo(){
   
    if(this.tabIdx == 0 && this.isExpanded){
      this.isExpanded = false
    }

    else{
      this.tabIdx = 0 
      this.isExpanded = true
    }
   
  }

  displayFactions(){
    
    if(this.tabIdx == 1 && this.isExpanded){
      this.isExpanded = false
    }
    else{
      this.tabIdx = 1
      this.isExpanded = true
    }
    
  }

  displayLandmarks(){
    if(this.tabIdx == 2 && this.isExpanded){
      this.isExpanded = false
    }
    else{
      this.tabIdx = 2
      this.isExpanded = true
    }
   
  }

  displayVessels(){
    if(this.tabIdx == 3 && this.isExpanded && !this.activeShip){
      this.isExpanded = false
    }
    else{
      this.tabIdx = 3
      this.isExpanded = true
      this.activeShip = null
    }
    
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
