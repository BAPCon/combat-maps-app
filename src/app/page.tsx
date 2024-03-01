//@ts-nocheck
'use client';
import styles from "./page.module.css";
import { client_load, waitForElement, addMarker, MapHandler } from "@/lib/maploader.tsx";
import $ from 'jquery';
import { Suspense, useEffect, useState } from "react";
import React from "react";
import { Flex, MenuDivider, MenuItemOption, MenuOptionGroup, Stack } from "@chakra-ui/react";
import { MapButtonModal, MapButtonModalInfo, MapButtonPopover } from "@/components/side-draw";
import { MapDropdownButton } from "@/components/map-button-dropdown";
import { VerticallyCenter } from "@/components/map-modal";
import { CardView } from "@/components/map-modal-cards";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { InfoIcon, SearchIcon } from "@chakra-ui/icons";
import { BsDatabase } from "react-icons/bs";
import { FaDatabase, FaInfo, FaMap, FaSearch } from "react-icons/fa";
import { BiInfoCircle } from "react-icons/bi";


export default function Home() {
  const [pathname, setPath] = useState(usePathname());
  const [placeId, setPlaceId] = useState();
  const [posts, setPosts] = useState([]);
  
  const searchParams = useSearchParams();
  
  const { replace } = useRouter();

  const [mapHandler, setMapHandler] = useState(new MapHandler(null))
  const reqParams = new URLSearchParams(searchParams);


  async function set_map_instance(__map: google.maps.Map, advancedMarkers: any) {
    console.log(advancedMarkers)
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

    __handler.center_event = __map.addListener("center_changed", () => {
      //@ts-ignore
      const params = reqParams;
      //@ts-ignore
      params.set("lat", __map.getCenter().lat())
      //@ts-ignore
      params.set("lng", __map.getCenter().lng())
      replace(`${pathname}?${params.toString()}`);
    });

    setMapHandler(mapHandler => __handler);

    $.getJSON("/api/items", function (data) {
      var items = [];
      console.log(data);
      $.each(data, function (index, item) {
        console.log(item)
        __handler.addMarker(item.position, { id: item.id })
      });
    });

    const latParams = reqParams.get('lat');
    const lngParams = reqParams.get('lng');

    if (latParams && lngParams) {
      __handler.map?.setCenter({ lat: Number(latParams), lng: Number(lngParams) })
    }
  }

  function set_doc_events() {
    function handleKeyDown(event) {
      if (event.code == "Escape") {
        setPosts(posts => [])
      }
    }
    document.addEventListener('keydown', handleKeyDown, true);
  }

  function setParams(key: string, value: string)
  {
    reqParams.set(key, value)
    replace(`${pathname}?${reqParams.toString()}`);
    mapHandler.center_event.remove();
    mapHandler.center_event = mapHandler.map.addListener("center_changed", () => {
      //@ts-ignore
      const params = reqParams;
      //@ts-ignore
      params.set("lat", mapHandler.map.getCenter().lat())
      //@ts-ignore
      params.set("lng", mapHandler.map.getCenter().lng())
      replace(`${pathname}?${params.toString()}`);
    });
  }

  useEffect(() => { client_load(set_map_instance); waitForElement('#map', set_doc_events) }, [])

  useEffect(() => {
    if (placeId == null) return;
    fetch(`/api/location?id=${placeId}`)
      .then((res) => res.json())
      .then((data: any) => {
        setPosts(posts => <CardView posts={data}></CardView>)
        //@ts-ignore
        setPlaceId(placeId => null)
      })
  }, [placeId])

  return (
    <main>
      <div id="map" className={styles['map-view']}></div>

      <div className={styles['map-overlay']}>

        <div className={styles['middle-container']}>
          <MenuBarAddon setParams={setParams}></MenuBarAddon>
          {posts}
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

        <MapButtonModal label="Display application info" icon={<FaInfo style={{margin:'auto'}} />}></MapButtonModal>

        <MapButtonPopover label="Search post content" icon={<FaSearch />}></MapButtonPopover>

        <MapDropdownButton label="Display application info" icon={<FaMap style={{margin:'auto'}} />}>
          <MenuOptionGroup defaultValue='asc' title='Map Type' type='radio' onChange={(event)=>{
            this.props.setParams("map", event)
          }}>
            <MenuItemOption value='std'>Standard</MenuItemOption>
            <MenuItemOption value='sat'>Satellite</MenuItemOption>
          </MenuOptionGroup>
        </MapDropdownButton>

        <MapDropdownButton label="Display application info" icon={<FaDatabase style={{margin:'auto'}} />}>
          <MenuOptionGroup title='Sources' type='checkbox' onChange={(event)=>{
            this.props.setParams("sources", event)
          }}>
            <MenuItemOption value='funker'>Funker530</MenuItemOption>
            <MenuItemOption value='combatfootage'>r/CombatFootage</MenuItemOption>
          </MenuOptionGroup>
        </MapDropdownButton>
        <VerticallyCenter />
      </Flex>
    );
  }
}
