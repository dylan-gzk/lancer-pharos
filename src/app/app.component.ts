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
import { Landmark, Ship } from './map-component/map-component.model';
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
 
    for (const key in this.iconStrings){
      const data = this.iconStrings[key]
      this.matIconRegistry.addSvgIcon(
        key,this.domSanitizer.bypassSecurityTrustResourceUrl(data)
      )
    }
  }

  svgStrings = ["station","diamond-x","triangle","star"]

  iconStrings: Record<string,string> = {
    "union":"assets/gms.svg",
    "armory":"assets/ha.svg",
    "barony":"assets/barony.svg",
    "albatross":"assets/albatross.svg",
    "ssc":"assets/ssc.svg",
    "station": "assets/station.svg",
    "diamond-x": "assets/diamond-x.svg",
    "triangle": "assets/triangle.svg",
    "star": "assets/star.svg",
    "spear":"assets/spear.svg"

  }

  isExpanded:boolean = false
  displayTabs:boolean = false
  tabIdx:number = 0

  activeShip!: Ship | null;
  activeLandmark!: Landmark | null;

  logos: Record<string,string> = {
    "Union Navy":'union',
    "Harrison Armory":'armory',
    "SSC":'ssc',
    "Albatross":"albatross"
  }

  shipMarkerData: Ship[] =  [
    {
      name:"UNS-CV Chao Praya",
      rotation:-135,
      position: [380,380],
      faction:"Union Navy",
      battlegroup:"Battlegroup Granite, 1st Apherion Fleet",
      class:"GMS Amazon-Class Carrier",
      homeport:"Edibiri Omninode",
      color:"union"
    }  ,
    {
      name:"PCV-SL Atalanta",
      rotation:12,
      position: [-200,200],
      faction:"Harrison Armory",
      battlegroup:"???",
      class:"HA Wagner-Class Corvette",
      color:"ha"
    },
    {
      name:"C-HK Auburn Heart",
      rotation: 75,
      position: [80,-280],
      faction:"SSC",
      battlegroup:"M.Coronet",
      class:"SSC Empyrean-Class Skyhook",
      color:"ssc"
    },
    {
      name:"ALB-SS Gienah-Srirano",
      rotation:12,
      position: [280,150],
      faction:"Albatross",
      battlegroup:"Srirano Detachment 2",
      class:"IPS-N Alexandria-Class Corvette, Makteba Custom",
      color:"albatross",
      subliner:true
    }
  ]

  landmarkMarkerData: Landmark[] = [
    {
      name: "Edibiri Omninode",
      class: "UOB Central Omninode",
      position: [400,400],
      faction:"Union Navy"
    },
    {
      name: "Uinta Station",
      class: "House of Stone/Sand Blink Gate",
      position: [-300,300],
      faction:"Union Navy",
      landmarkType:"station",
      description:`The system of Apherion was the second Karrakin system to recieve a blink gate in 3218u, serving the worlds of Khayradin and Tilimsan. Uinta Station soon became 
      the busiest port within Union space, with thousands of ships passing through its gate daily, ferrying millions of tonnes of resources to and from the resource-rich worlds and moons
      of Apherion, lining the pockets of Hagiographic nobility.
            
      Across its six habitation rings, the station is home to over three million Karrakin citizens, facilitating the station's operations across its many bazaars, refineries, and brokerages. 
      After Baronic Unified Command's sudden assault to take control of the station, the Stonelord has put the full focus of the station into returning the shipyard to full strength to replenish 
      the Baronic Navy's depleted fleets. During the Uinta Station Incident, the station's blinkspace capabilities were significantly damaged, and will take months of repairs from specialized 
      engineers to return to full operation. Until then, Stonelord Cannamos and his naval forces are trapped in the system, and have since put his focus into rebuilding strength and pacifying
      opposing factions on Khayradin.

      `
    },
    {
      name: "Bastion diKhayradi",
      class: "House of Stone Orbital Defence Platform",
      position: [50,-50],
      faction:"House of Stone",
      landmarkType:"station",
    }
  ]


  @ViewChild(MapComponentComponent) mapComponent!: MapComponentComponent

  ngAfterViewInit(){
    this.isExpanded = true
    this.tabIdx = 0
  }

  flyToLandmark(){
    this.mapComponent.map.flyTo([0,0],2)
  }

  handleMapClick(event:string){
    console.log(event)
    this.displayVessels()
    this.activeShip = this.shipMarkerData.find(e => e.name === event) || null
    this.tabIdx=3
    this.isExpanded = true
  }

  handleLandmarkClick(event:string){
    console.log(event)
    this.displayLandmarks()
    this.activeLandmark = this.landmarkMarkerData.find(e => e.name === event) || null
    this.tabIdx = 2
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

  getActiveLandmarkIcon(){
    if(this.activeLandmark && this.activeLandmark.faction){
      return this.logos[this.activeLandmark.faction]

    }
    else{
      return '';
    }
  }
  
}
