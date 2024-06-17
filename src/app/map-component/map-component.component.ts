import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-rotatedmarker';
import { Landmark, Ship } from './map-component.model';

@Component({
  selector: 'app-map-component',
  standalone: true,
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.less'],
})
export class MapComponentComponent implements OnInit, AfterViewInit {

  @Input() markerData : Ship[] = []
  @Input() landmarkData: Landmark[] = []
  @Output() mapClickEmitter = new EventEmitter<string>
  @Output() landmarkClickEmitter = new EventEmitter<string>

  readonly spaceship_small = 'assets/spaceship.svg'

  public map!: L.Map;

  customColor = ' #FF0000';

  customStyle = `
    background-color: ${this.customColor};
    transform: rotate(45deg);
  `;

  spaceshipIcon = new L.Icon({
    iconUrl: 'assets/spaceship.svg',
    shadowSize: [0, 0],

    iconSize: [48, 48],
  });

  spaceshipIconSmall = new L.Icon({
    iconUrl: 'assets/spaceship.svg',
    shadowSize: [0, 0],

    iconSize: [24,24],
  });

  landmarkIcon = new L.Icon({
    iconUrl: 'assets/landmark.svg',
    shadowSize: [0, 0],

    iconSize: [24,24],
  });

  markers: L.Marker[] = [
    
  ];



  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initializeMap();
    this.addMarkers();
    this.map.flyTo([0,0],1)
  }

  private initializeMap() {
    /*const baseMapURl = 'space_background.png'
    this.map = L.map('map',{crs:L.CRS.Simple});
    var bounds: any = [[0,0], [1000,1000]];
    L.tileLayer(baseMapURl,bounds).addTo(this.map);
    console.log(this.map) */
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      maxZoom: 3,
      minZoom: 0,
      attributionControl:false,
      zoomControl: false,
    });

    var bounds: any = [
      [-720, -1280],
      [720, 1280],
    ];
    const imageOverlay = L.imageOverlay('assets/khayradin_bg.png', bounds);
    imageOverlay.addTo(this.map);
    this.map.fitBounds(bounds);
    this.map.setMaxBounds(bounds);
    this.map.on('drag', (map) => {
      map.target.panInsideBounds(bounds, { animate: false });
    });
  }

  onClick(event:L.LeafletMouseEvent){
    this.map.flyTo(event.latlng,2)
    this.mapClickEmitter.emit(event.target.options.title)
  }

  onLandmarkClick(event:L.LeafletMouseEvent){
    this.map.flyTo(event.latlng,2)
    this.mapClickEmitter.emit(event.target.options.title)
  }

  private addMarkers() {
    this.markerData.forEach((ship) => {
      let icon:L.Icon
      if(ship?.subliner){
        icon = this.spaceshipIconSmall
      }
      else{
        icon = this.spaceshipIcon
      }
      this.markers.push(L.marker(ship.position,{ icon: icon,title:ship.name })
      .setRotationAngle(ship.rotation)
      .on("click", (e) => {
        this.onClick(e)
      })
      
      )
    })

    this.landmarkData.forEach((landmark) => {
      this.markers.push(L.marker(landmark.position,{icon:this.landmarkIcon,title:landmark.name})
      .on("click",(e)=>{
        this.onLandmarkClick(e)
      }))
    })

    // Add your markers to the map
    this.markers.forEach((marker) => {
      marker.addTo(this.map);
      //marker.setRotationAngle(45)
    });

    var circle = L.circle([51.508, -0.11], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 20,
    }).addTo(this.map);

    this.map.on("zoomend",(event) => {
      
    })
    
  }

}
