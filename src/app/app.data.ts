import { Ship, Landmark } from "./map-component/map-component.model"

export const shipMarkerData: Ship[] =  [
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
          name:"HG-CC Seneschal's Might",
          rotation:12,
          position: [-200,200],
          faction:"Hagiographic Coalition",
          battlegroup:"Armada-2 Khayradin",
          class:"FKS Calendula-Class Battlecruiser",
          color:"ktb"
        },
        {
          name:"C-HK Auburn Heart",
          rotation: 75,
          position: [480,-480],
          faction:"SSC",
          battlegroup:"M.Coronet",
          class:"SSC Empyrean-Class Skyhook",
          color:"ssc"
        },
        {
          name:"ALB-SS Gienah-Srirano",
          rotation:-135,
          position: [700,650],
          faction:"Albatross",
          battlegroup:"Srirano Detachment 2",
          class:"IPS-N Alexandria-Class Corvette, Makteba Custom",
          color:"albatross",
          subliner:true
        },
        {
          name:"KTB-LS Akagi",
          rotation:-115,
          position: [350,280],
          faction:"Alpha Core Squadron",
          battlegroup:"Alpha Core Squadron",
          class:"SSC Kusanagi-Class Troop Carrier",
          color:"alpha",
          subliner:true
        }
      ]
    
export const landmarkMarkerData: Landmark[] = [
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
          faction:"Hagiographic Coalition",
          landmarkType:"station",
        },
        {
          name:"Amasra",
          class:"House Altia Capital",
          position:[310,-210],
          faction:"",
          landmarkType:"city",
          description:"The ancient mountain fortress capital of House Altia."

        }
      ]



export const iconStrings: Record<string,string> = {
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

export const logos: Record<string,string> = {
    "Union Navy":'union',
    "Harrison Armory":'armory',
    "SSC":'ssc',
    "Albatross":"albatross",
    "Alpha Core Squadron":"alpha",
    "Hagiographic Coalition":"barony"
}
