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

  readonly colors: Map<string,string> = new Map<string,string>([
    ["ssc","b8860b"],
    ["ha","a632a8"],
    ["albatross","96c5d6"],
    ["union","ed3f39"]
    ])

  color:string | undefined = undefined;

  readonly spaceship_small = 'assets/spaceship.svg'

  spaceship_html = `

    <?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="144px" height="144px" viewBox="0 0 144 144" version="1.1">
      <g id="surface1">
      <path style=" stroke:none;fill-rule:nonzero;fill:#${this.color};fill-opacity:1;" d="M 48.742188 56.660156 L 42.300781 56.660156 L 41.71875 56.082031 C 39.96875 54.355469 36.472656 52.03125 31.597656 49.34375 L 17.125 49.335938 C 12.238281 52.011719 8.738281 54.339844 6.976562 56.082031 L 6.394531 56.660156 L 0 56.660156 L 21.3125 0 L 27.429688 0 Z M 16.109375 45.335938 L 32.621094 45.347656 L 33.066406 45.589844 C 37.140625 47.8125 40.3125 49.800781 42.535156 51.519531 L 24.660156 4 L 24.082031 4 L 6.226562 51.464844 C 8.457031 49.746094 11.613281 47.777344 15.660156 45.578125 Z M 16.109375 45.335938 "/>
      </g>
    </svg>
    <!--fill:rgb(100%,25%,40%);-->

  `

  public map!: L.Map;

  customColor = ' #FF0000';

  customStyle = `
    background-color: ${this.customColor};
    transform: rotate(45deg);
  `;

  spaceshipIcon = new L.DivIcon({
    html: this.spaceship_html,
    shadowSize: [0, 0],
    className:"",
    iconSize: [48, 48],
  });

  spaceshipIconSmall = new L.DivIcon({
    html: this.spaceship_html,
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
    this.landmarkClickEmitter.emit(event.target.options.title)
  }

  private addMarkers() {
    this.markerData.forEach((ship) => {
      
      let shipColor: string| undefined = ship.color
      if(!shipColor){
        shipColor = "ffffff"
      }

      shipColor = this.colors.get(shipColor)
      
      let shipHTML = `

      <?xml version="1.0" encoding="UTF-8"?>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="72px" height="72px" viewBox="0 0 72 72" version="1.1">
        <g id="surface1">
        <path style=" stroke:none;fill-rule:nonzero;fill:#${shipColor};fill-opacity:1;" d="M 48.742188 56.660156 L 42.300781 56.660156 L 41.71875 56.082031 C 39.96875 54.355469 36.472656 52.03125 31.597656 49.34375 L 17.125 49.335938 C 12.238281 52.011719 8.738281 54.339844 6.976562 56.082031 L 6.394531 56.660156 L 0 56.660156 L 21.3125 0 L 27.429688 0 Z M 16.109375 45.335938 L 32.621094 45.347656 L 33.066406 45.589844 C 37.140625 47.8125 40.3125 49.800781 42.535156 51.519531 L 24.660156 4 L 24.082031 4 L 6.226562 51.464844 C 8.457031 49.746094 11.613281 47.777344 15.660156 45.578125 Z M 16.109375 45.335938 "/>
        </g>
      </svg>
      <!--fill:rgb(100%,25%,40%);-->
  
      `

      let size:L.PointTuple
      
      if(ship?.subliner){
        //icon = this.spaceshipIconSmall
        size = [12,12]
      }
      else{
        //icon = this.spaceshipIcon
        size = [24,24]
      }

      let icon:L.DivIcon = new L.DivIcon({
        html: shipHTML,
        shadowSize: [0, 0],
        className:"",
        iconSize: size,
      });

     
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
