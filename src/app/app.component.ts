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
import { shipMarkerData, landmarkMarkerData, logos } from './app.data';
import { PharosInfoComponent } from './pharos-info/pharos-info.component';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
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
    private domSanitizer: DomSanitizer,
    private dialog: MatDialog
  ){
 
    for (const key in this.iconStrings){
      const data = this.iconStrings[key]
      this.matIconRegistry.addSvgIcon(
        key,this.domSanitizer.bypassSecurityTrustResourceUrl(data)
      )
    }
  }

  readonly logos = logos

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
    "spear":"assets/spear.svg",
    "alpha":"assets/alpha.svg"

  }

  isExpanded:boolean = false
  displayTabs:boolean = false
  tabIdx:number = 0

  activeShip!: Ship | null;
  activeLandmark!: Landmark | null;

  shipMarkerData: Ship[] = shipMarkerData

  landmarkMarkerData: Landmark[] = landmarkMarkerData


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
  
  displayLegend(){
    if(this.tabIdx == 4 && this.isExpanded && !this.activeShip){
      this.isExpanded = false
    }
    else{
      this.tabIdx = 4
      this.isExpanded = true
      this.activeShip = null
    }
  }

  displayPharosInfo(){
    let dialogRef = this.dialog.open(PharosInfoComponent, {
      height: '400px',
      width: '600px',
    });
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
