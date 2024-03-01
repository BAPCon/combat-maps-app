
'use client';
import styles from "./page.module.css";
import { client_load, waitForElement, MapHandler } from "@/lib/maploader";
import { useEffect, useState } from "react";
import React from "react";
import { Flex, MenuItemOption, MenuOptionGroup } from "@chakra-ui/react";
import { MapButtonModal, MapButtonPopover } from "@/components/menu/menu-modal";
import { MapDropdownButton } from "@/components/menu/menu-button-dropdown";
import { CardView } from "@/components/map-modal-cards";
import { usePathname, useRouter } from "next/navigation";
import { FaDatabase, FaInfo, FaMap, FaSearch } from "react-icons/fa";
import { WelcomeModal } from "@/components/menu/view-modal";


export default function Home() {

  // Init State Hooks 
  const [posts, setPosts] = useState([]);
  const [placeId, setPlaceId] = useState();
  const [pathname, setPath] = useState(usePathname());
  const [mapHandler, setMapHandler] = useState(new MapHandler(null, null))
  
  // To-do: Qparams replacement for shareable link
  // const { replace } = useRouter();


  // Callback on Map init
  async function set_map_instance(__map: google.maps.Map, advancedMarkers: any) {
    
    // Set instance controls active/deactive
    __map.setOptions(
      {
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          position: google.maps.ControlPosition.BLOCK_START_INLINE_END
        },
        fullscreenControlOptions: {
          position: google.maps.ControlPosition.BLOCK_START_INLINE_END
        }
      }
    )

    const __handler = new MapHandler(__map, setPlaceId);

    // To-do: Set lat/lng value in qparams for shareable links
    __handler.center_event = __map.addListener("center_changed", () => {});

    // Map handler as state
    setMapHandler(mapHandler => __handler);

    // Inline import of jquery (laziness) to get around `undefined` document
    const $ = (await import('jquery')).default;

    // Fetch markers from api route
    $.getJSON("/api/items", function (data) {
      console.log(data);
      $.each(data, function (index, item) {
        console.log(item)
        __handler.addMarker(item.position, { id: item.id })
      });
    })

  }

  // Handle document level events
  function docLevelEvents() {
    
    function handleKeyDown(event: { code: string; }) {
      if (event.code == "Escape") {
        // Clear posts display
        setPosts(posts => [])
      }
    }
    // Add listeners
    document.addEventListener('keydown', handleKeyDown, true);
  }
  
  // Load map instance, attach events to document
  useEffect(() => { client_load(set_map_instance); waitForElement('#map', docLevelEvents) }, [])

  // Effect handler as trigger when marker is clicked
  useEffect(() => {
    /*
    Do not place code before null check
    */
    if (placeId == null) return;
    fetch(`/api/location?id=${placeId}`)
      .then((res) => res.json())
      .then((data: any) => {
        //@ts-ignore
        setPosts(posts => <CardView posts={data}></CardView>)
        //@ts-ignore
        setPlaceId(placeId => null)
      })
  }, [placeId])

  return (
    // Main page view response
    <main>
      <div id="map" className={styles['map-view']}></div>
      <div className={styles['map-overlay']}>
        <div className={styles['middle-container']}>


          {
            // Welcome Modal
            <WelcomeModal></WelcomeModal>
          }

          {
            // Custom map controls/vertical menu
          <MenuBarAddon></MenuBarAddon>
          }
          
          { // Displays the posts if marker is clicked
          posts
          }

        </div>
      </div>

    </main>
  );
}

class MenuBarAddon extends React.Component {

  constructor(props: { height: number, setParams: any}) {
    super(props)
  }

  render(): React.ReactNode {
    return (
      <Flex className={styles['left-tool-bar'] + " " + styles['clickable']} flexDirection={"column"} gap={6} alignItems={"center"}>

        <MapButtonModal label="Display application info" icon={<FaInfo style={{ margin: 'auto' }} />} placement={undefined} header={""} body={""}></MapButtonModal>

        <MapButtonPopover label="Search post content" icon={<FaSearch />}></MapButtonPopover>

        <MapDropdownButton label="Display application info" icon={<FaMap style={{margin:'auto'}} />}>
          <></>
          <MenuOptionGroup defaultValue='asc' title='Map Type' type='radio' onChange={(event)=>{
          }}>
            <MenuItemOption value='std'>Standard</MenuItemOption>
            <MenuItemOption value='sat'>Satellite</MenuItemOption>
          </MenuOptionGroup>
        </MapDropdownButton>

        <MapDropdownButton label="Display application info" icon={<FaDatabase style={{margin:'auto'}} />}>
          <></>
          <MenuOptionGroup title='Sources' type='checkbox' onChange={(event)=>{
          }}>
            <MenuItemOption value='funker'>Funker530</MenuItemOption>
            <MenuItemOption value='combatfootage'>r/CombatFootage</MenuItemOption>
          </MenuOptionGroup>
        </MapDropdownButton>

      </Flex>
    );
  }
}
