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
    ["union","ed3f39"],
    ["ktb","C084FC"],
    ["alpha","D70040"],
    ["cot","36BA98"]
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
    iconSize: [48,48],
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
      maxZoom: 2,
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

  onVesselClick(ship:Ship){
    this.map.flyTo(ship.position,2)
    this.mapClickEmitter.emit(ship.name)
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
      
      let size:number
      
      size = ship?.subliner ? 18 : 24

      let shipHTML = `

      <?xml version="1.0" encoding="UTF-8"?>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${size}px" height="${size}px" viewBox="0 0 72 72" version="1.1">
        <g id="surface1">
        <path style="stroke:none;fill-rule:nonzero;fill:#${shipColor};fill-opacity:1;" d="M 48.742188 56.660156 L 42.300781 56.660156 L 41.71875 56.082031 C 39.96875 54.355469 36.472656 52.03125 31.597656 49.34375 L 17.125 49.335938 C 12.238281 52.011719 8.738281 54.339844 6.976562 56.082031 L 6.394531 56.660156 L 0 56.660156 L 21.3125 0 L 27.429688 0 Z M 16.109375 45.335938 L 32.621094 45.347656 L 33.066406 45.589844 C 37.140625 47.8125 40.3125 49.800781 42.535156 51.519531 L 24.660156 4 L 24.082031 4 L 6.226562 51.464844 C 8.457031 49.746094 11.613281 47.777344 15.660156 45.578125 Z M 16.109375 45.335938 "/>
        </g>
      </svg>
      <!--fill:rgb(100%,25%,40%);-->
  
      `      

      let icon:L.DivIcon = new L.DivIcon({
        html: shipHTML,
        shadowSize: [0, 0],
        iconSize: [size,size],
        iconAnchor: ship?.subliner ? [5,60] : [7,64],
        className:""
      });
     
      this.markers.push(L.marker(ship.position,{ icon: icon,title:ship.name })
      .setRotationAngle(ship.rotation)
      .on("click", (e) => {
        this.onClick(e)
      })
      
      )
    })

    let landmarkHtml = `
      <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
      <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path style="stroke:#00FF00;fill-rule:nonzero;fill:none;fill-opacity:1;" d="M4.26244 14.2628C3.47041 13.4707 3.07439 13.0747 2.92601 12.618C2.7955 12.2164 2.7955 11.7837 2.92601 11.382C3.07439 10.9253 3.47041 10.5293 4.26244 9.73727L9.73703 4.26268C10.5291 3.47065 10.9251 3.07463 11.3817 2.92626C11.7834 2.79574 12.2161 2.79574 12.6178 2.92626C13.0745 3.07463 13.4705 3.47065 14.2625 4.26268L19.7371 9.73727C20.5291 10.5293 20.9251 10.9253 21.0735 11.382C21.204 11.7837 21.204 12.2164 21.0735 12.618C20.9251 13.0747 20.5291 13.4707 19.7371 14.2628L14.2625 19.7373C13.4705 20.5294 13.0745 20.9254 12.6178 21.0738C12.2161 21.2043 11.7834 21.2043 11.3817 21.0738C10.9251 20.9254 10.5291 20.5294 9.73703 19.7373L4.26244 14.2628Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `

    let landmarkCrossHtml = `
      <?xml version="1.0" encoding="utf-8"?>
      <svg width="36px" height="36px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path style="stroke:#FFBF00;fill-rule:nonzero;fill:none;fill-opacity:1;" d="M12 3L14.0357 8.16153C14.2236 8.63799 14.3175 8.87622 14.4614 9.0771C14.5889 9.25516 14.7448 9.41106 14.9229 9.53859C15.1238 9.68245 15.362 9.77641 15.8385 9.96432L21 12L15.8385 14.0357C15.362 14.2236 15.1238 14.3175 14.9229 14.4614C14.7448 14.5889 14.5889 14.7448 14.4614 14.9229C14.3175 15.1238 14.2236 15.362 14.0357 15.8385L12 21L9.96432 15.8385C9.77641 15.362 9.68245 15.1238 9.53859 14.9229C9.41106 14.7448 9.25516 14.5889 9.0771 14.4614C8.87622 14.3175 8.63799 14.2236 8.16153 14.0357L3 12L8.16153 9.96432C8.63799 9.77641 8.87622 9.68245 9.0771 9.53859C9.25516 9.41106 9.41106 9.25516 9.53859 9.0771C9.68245 8.87622 9.77641 8.63799 9.96432 8.16153L12 3Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `

    let cityHtml = `
    <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="36px" height="36px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path style="stroke:#0eBFFF;fill-rule:nonzero;fill:none;fill-opacity:1;" d="M16.9999 7.00009L14.2625 4.26268C13.4705 3.47065 13.0745 3.07463 12.6178 2.92626C12.2161 2.79574 11.7834 2.79574 11.3817 2.92626C10.9251 3.07463 10.5291 3.47065 9.73703 4.26268L6.99973 6.99998M16.9999 7.00009L19.7371 9.73727C20.5291 10.5293 20.9251 10.9253 21.0735 11.382C21.204 11.7837 21.204 12.2164 21.0735 12.618C20.9251 13.0747 20.5291 13.4707 19.7371 14.2628L16.9998 17M16.9999 7.00009L6.99973 17M6.99973 17L9.73703 19.7373C10.5291 20.5294 10.9251 20.9254 11.3817 21.0738C11.7834 21.2043 12.2161 21.2043 12.6178 21.0738C13.0745 20.9254 13.4705 20.5294 14.2625 19.7373L16.9998 17M6.99973 17L4.26244 14.2628C3.47041 13.4707 3.07439 13.0747 2.92601 12.618C2.7955 12.2164 2.7955 11.7837 2.92601 11.382C3.07439 10.9253 3.47041 10.5293 4.26244 9.73727L6.99973 6.99998M16.9998 17L6.99973 6.99998" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `

    

    this.landmarkData.forEach((landmark) => {
      let htmlLandmarkIcon = new L.DivIcon({
        html: landmark?.landmarkType==="station" ? landmarkCrossHtml : landmark?.landmarkType==="city" ? cityHtml : landmarkHtml,
        shadowSize:[0,0],
        iconSize:landmark?.landmarkType==="station" ? [36,36] : [24,24],
        iconAnchor:landmark?.landmarkType==="station" ? [18,72] : [12,48],
        className:''
      })

      this.markers.push(L.marker(landmark.position,{icon:htmlLandmarkIcon,title:landmark.name})
      .on("click",(e)=>{
        this.onLandmarkClick(e)
      }))
    })

    // Add your markers to the map
    this.markers.forEach((marker) => {
      marker.addTo(this.map);
      //marker.setRotationAngle(45)
    });

    L.circle([200,-200], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 160,
    }).bindTooltip("Khayradin",{permanent:true,direction:'center'})
    .addTo(this.map);

    L.circle([-600,1000], {
      color: 'orange',
      fillColor: '#f30',
      fillOpacity: 0.5,
      radius: 64,
    }).bindTooltip("Tilimsan",{permanent:true,direction:'center'})
    .addTo(this.map);

    L.circle([-100, -500], {
      color: 'blue',
      fillColor: '#03f',
      fillOpacity: 0.5,
      radius: 64,
    }).bindTooltip("Free Sanjak",{permanent:true,direction:'center'})
    .addTo(this.map);

    
    new L.Polyline([[350,275],[308,-195]],{
      "dashArray":[10,20],
      "weight":3,
    }).addTo(this.map)


    this.map.on("zoomend",(event) => {
      
    })
    
  }

}
