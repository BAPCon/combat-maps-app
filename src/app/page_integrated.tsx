'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { client_load, waitForElement} from "@/lib/maploader";
import $ from 'jquery';
import { useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { render } from "react-dom";
import React from "react";
import { createRoot } from "react-dom/client";
import { Flex } from "@chakra-ui/react";


export default function Home() {

  let menu_bar: [boolean, HTMLElement | JQuery<HTMLElement> | undefined, any] = [false, undefined, undefined];

  let menu_bar_addon = <MenuBarAddon />

  function set_map_instance(__map: google.maps.Map)
  {
    if (!menu_bar[0])
    {
      waitForElement("div[role='menubar']", get_menu_bar)
    }
  }

  function get_menu_bar()
  {
    if (!menu_bar[0])
    {
      menu_bar[0] = true;
      menu_bar[1] = $("div[role='menubar']");
      var newElement = document.createElement('div');
      var root = createRoot(newElement)
      menu_bar[1][0].appendChild(newElement)
      // @ts-ignore
      root.render(<MenuBarAddon height={menu_bar[1][0].children[0].clientHeight} />)
    }
  }

  function rmet()
  {
    alert('rmet!')
  }

  useEffect(()=>{client_load(set_map_instance)}, [])

  

  return (
    <main>
      <div id="map" className={styles['map-view']}></div>
      <div className={styles['map-overlay']}>
      <div className={styles['clickable']}>
      <button>Click me</button>
      </div>
        
      </div>
    </main>
  );
}

class MenuBarAddon extends React.Component
{
  public height: number;
  constructor(props: {height: number})
  {
    super(props)
    this.height = props.height
  }
  button_pressed()
  {
    alert('hello!')
  }

  render(): React.ReactNode {
    return (
      <Flex ml={12} h={this.height} w={"35vw"} className={styles['top-tool-bar']}>
      </Flex>
    );
  }
}
