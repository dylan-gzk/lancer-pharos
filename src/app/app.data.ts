import { Ship, Landmark, Pilot } from "./map-component/map-component.model"


export const pcPilots: Pilot[] = [
  {
    name:"Inara Ignatius",
    callsign:"WINTER",
    callsignColor:"text-[#5B99C2]",
    frame:"SSC BLACK WITCH",
    frameName:"Aba-Yomi's Revenge"
  },
  {
    name:"Lucy Celeste",
    callsign:"MELTDOWN",
    callsignColor:"text-[#F05A7E]", 
    frame:"IPS-N Tortuga",
    frameName:"Reagan"
  },
  {
    name:"Bronya",
    callsign:"SILVERWING",
    callsignColor:"text-[#FFAD60]",
    frame:"SSC Dusk Wing",
    frameName:"Firefly"
  },
  {
    name:"Ren Jeronimo",
    callsign:"APOLLO",
    callsignColor:"text-[#6368C6]",
    frame:"HORUS Gorgon",
    frameName:"PLACEHOLDER"
  },
  {
    name:"Ben Jeronimo",
    callsign:"ARTEMIS",
    callsignColor:"text-[#EE4E4E]",
    frame:"IPS-N Empakaai",
    frameName:"PLACEHOLDER"
  }
]

export const shipMarkerData: Ship[] =  [
        {
          name:"UNS-CV Chao Praya",
          rotation:-135,
          position: [380,680],
          faction:"Union Navy",
          battlegroup:"Battlegroup Granite, 1st Apherion Fleet",
          class:"GMS Amazon-Class Carrier",
          homeport:"Edibiri Omninode",
          color:"union"
        },
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
          color:"ssc",
          description:`
          The Auburn Heart is the center of Smith-Shimano Corpro's extensive operations within the Khayradin system. 

          Built to meet the massive economic needs of SSC technologies for Baronic customers, it has long hub for scientific research and knowledge exchange with Khayradin-based labs. The Skyhook boasted significant facilities, including a Schedule-3 micro-shipyard, two cloning facilities for separate noble and ignoble use, and its own proprietary line of mech designs, produced inhouse by Atelier Iris.

          Following the Begum Declaration of Secession, it has become a place of refuge for residents of the House of Moments escaping violence across the system. Station administrators have closed the station to all non-Constellar citizens, and publicly announced that any effort to prevent extraction of their citizens will be met with appropriate force. 
          `
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
          subliner:true,
          pilots:pcPilots
        },
        {
          name:"TYR-FV Crystal Virtue",
          rotation: -4,
          position:[-63,-490],
          faction:"Children of Tyrannus",
          battlegroup:"Armada-1 Ludra",
          class:"RKF Bastille-Class Security Vessel",
          color:"cot"
        }
      ]
    
export const landmarkMarkerData: Landmark[] = [
        {
          name: "Edibiri Omninode",
          class: "UOB Central Omninode",
          position: [400,700],
          faction:"Union Navy"
        },
        {
          name: "Uinta Station",
          class: "House of Stone/Sand Blink Gate",
          position: [-300,300],
          faction:"Union Navy",
          landmarkType:"station",
          description:`The system of Apherion was the second Karrakin system to recieve a blink gate in 3218u, serving the worlds of Khayradin and Tilimsan. Uinta Station soon became the busiest port within Union space, with thousands of ships passing through its gate daily, ferrying millions of tonnes of resources to and from the resource-rich worlds and moons of Apherion, lining the pockets of Hagiographic nobility.
                
          Across its six habitation rings, the station is home to over three million Karrakin citizens, facilitating the station's operations across its many bazaars, refineries, and brokerages. After Baronic Unified Command's sudden assault to take control of the station, the Stonelord has put the full focus of the station into returning the shipyard to full strength to replenish the Baronic Navy's depleted fleets. During the Uinta Station Incident, the station's blinkspace capabilities were significantly damaged, and will take months of repairs from specialized engineers to return to full operation. Until then, Stonelord Cannamos and his naval forces are trapped in the system, and have since put his focus into rebuilding strength and pacifying local opposing factions on Khayradin.
    
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
          name: "Plumeria Station",
          class: "House of Stone Major Station",
          position: [350,-350],
          faction:"???",
          landmarkType:"station",
          description:"Major logistics station located at Apherion-Khayradin Lagrange 4. "
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
